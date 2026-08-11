import { useState } from "react";
import BakeLogHero from "../../components/BakeLogHero/BakeLogHero";
import BakeLogForm from "../../components/BakeLogForm/BakeLogForm";
import BakeLogStats from "../../components/BakeLogStats/BakeLogStats";
import BakeLogTimeline from "../../components/BakeLogTimeline/BakeLogTimeline";
import { useBakeLogs } from "../../contexts/BakeLogContext";
import "./BakeLog.css";

function BakeLog() {
  const { bakeLogs } = useBakeLogs();
  const [editingBakeLog, setEditingBakeLog] = useState(null);

  function handleEditBake(bakeLog) {
    setEditingBakeLog(bakeLog);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setEditingBakeLog(null);
  }

  function handleEditComplete() {
    setEditingBakeLog(null);
  }

  return (
    <main className="bake-log">
      <BakeLogHero />

      <BakeLogForm
        editingBakeLog={editingBakeLog}
        onCancelEdit={handleCancelEdit}
        onEditComplete={handleEditComplete}
      />

      <BakeLogStats bakeLogs={bakeLogs} />

      <BakeLogTimeline onEditBake={handleEditBake} />
    </main>
  );
}

export default BakeLog;
