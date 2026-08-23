/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext(null);

const FAVORITES_STORAGE_KEY = "sourdoughlife-favorites";

function getStoredFavorites() {
  try {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("Unable to read saved favorites:", error);
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [favoriteRecipeIds, setFavoriteRecipeIds] =
    useState(getStoredFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favoriteRecipeIds),
      );
    } catch (error) {
      console.error("Unable to save favorites:", error);
    }
  }, [favoriteRecipeIds]);

  function isFavorite(recipeId) {
    return favoriteRecipeIds.includes(recipeId);
  }

  function addFavorite(recipeId) {
    setFavoriteRecipeIds((currentFavorites) => {
      if (currentFavorites.includes(recipeId)) {
        return currentFavorites;
      }

      return [...currentFavorites, recipeId];
    });
  }

  function removeFavorite(recipeId) {
    setFavoriteRecipeIds((currentFavorites) =>
      currentFavorites.filter((id) => id !== recipeId),
    );
  }

  function toggleFavorite(recipeId) {
    if (!isAuthenticated) {
      return;
    }

    if (isFavorite(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  }

  const contextValue = {
    favoriteRecipeIds,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}
