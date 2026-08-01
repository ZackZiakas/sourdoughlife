/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const BakeLogContext = createContext(null);

const BAKE_LOG_STORAGE_KEY = "sourdoughlife-bake-logs";

function getStoredBakeLogs() {
  try {
    const storedBakeLogs = localStorage.getItem(BAKE_LOG_STORAGE_KEY);

    if (!storedBakeLogs) {
      return [];
    }

    const parsedBakeLogs = JSON.parse(storedBakeLogs);

    return Array.isArray(parsedBakeLogs) ? parsedBakeLogs : [];
  } catch (error) {
    console.error("Unable to read bake logs:", error);
    return [];
  }
}

function createBakeLogId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function BakeLogProvider({ children }) {
  const [bakeLogs, setBakeLogs] = useState(getStoredBakeLogs);

  useEffect(() => {
    try {
      localStorage.setItem(BAKE_LOG_STORAGE_KEY, JSON.stringify(bakeLogs));
    } catch (error) {
      console.error("Unable to save bake logs:", error);
    }
  }, [bakeLogs]);

  function addBakeLog(bakeLogData) {
    const newBakeLog = {
      id: createBakeLogId(),
      recipeId: bakeLogData.recipeId,
      recipeTitle: bakeLogData.recipeTitle,
      bakeDate: bakeLogData.bakeDate,
      rating: Number(bakeLogData.rating),
      notes: bakeLogData.notes.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBakeLogs((currentBakeLogs) => [newBakeLog, ...currentBakeLogs]);

    return newBakeLog;
  }

  function updateBakeLog(bakeLogId, updatedData) {
    setBakeLogs((currentBakeLogs) =>
      currentBakeLogs.map((bakeLog) => {
        if (bakeLog.id !== bakeLogId) {
          return bakeLog;
        }

        return {
          ...bakeLog,
          ...updatedData,
          rating: Number(updatedData.rating),
          notes: updatedData.notes.trim(),
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  }

  function deleteBakeLog(bakeLogId) {
    setBakeLogs((currentBakeLogs) =>
      currentBakeLogs.filter((bakeLog) => bakeLog.id !== bakeLogId),
    );
  }

  function getBakeLogById(bakeLogId) {
    return bakeLogs.find((bakeLog) => bakeLog.id === bakeLogId);
  }

  const sortedBakeLogs = useMemo(
    () =>
      [...bakeLogs].sort((firstLog, secondLog) => {
        const firstDate = new Date(firstLog.bakeDate).getTime();
        const secondDate = new Date(secondLog.bakeDate).getTime();

        return secondDate - firstDate;
      }),
    [bakeLogs],
  );

  const contextValue = {
    bakeLogs: sortedBakeLogs,
    bakeLogCount: bakeLogs.length,
    addBakeLog,
    updateBakeLog,
    deleteBakeLog,
    getBakeLogById,
  };

  return (
    <BakeLogContext.Provider value={contextValue}>
      {children}
    </BakeLogContext.Provider>
  );
}

export function useBakeLogs() {
  const context = useContext(BakeLogContext);

  if (!context) {
    throw new Error("useBakeLogs must be used inside a BakeLogProvider");
  }

  return context;
}
