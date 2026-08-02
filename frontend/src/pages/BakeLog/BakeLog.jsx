import { useState } from "react";
import BakeLogHero from "../../components/BakeLogHero/BakeLogHero";
import BakeLogForm from "../../components/BakeLogForm/BakeLogForm";
import BakeLogTimeline from "../../components/BakeLogTimeline/BakeLogTimeline";
import "./BakeLog.css";

function BakeLog() {
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

      <BakeLogTimeline onEditBake={handleEditBake} />
    </main>
  );
}

export default BakeLog;
