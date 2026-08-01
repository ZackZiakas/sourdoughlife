import { useState } from "react";
import { useBakeLogs } from "../../contexts/BakeLogContext";
import BakeLogEntry from "../BakeLogEntry/BakeLogEntry";
import BakeLogDetails from "../BakeLogDetails/BakeLogDetails";
import Modal from "../Modal/Modal";
import "./BakeLogTimeline.css";

function BakeLogTimeline() {
  const { bakeLogs, deleteBakeLog } = useBakeLogs();
  const [selectedBakeLog, setSelectedBakeLog] = useState(null);

  function handleOpenDetails(bakeLog) {
    setSelectedBakeLog(bakeLog);
  }

  function handleCloseDetails() {
    setSelectedBakeLog(null);
  }

  function handleDelete(bakeLogId) {
    deleteBakeLog(bakeLogId);
    handleCloseDetails();
  }

  function handleEdit() {
    // Editing will be connected in the next sprint.
    console.log("Edit bake:", selectedBakeLog);
  }

  return (
    <section className="bake-log-timeline">
      <div className="bake-log-timeline__container container">
        <div className="bake-log-timeline__heading">
          <p className="bake-log-timeline__eyebrow">Journal history</p>

          <h2 className="bake-log-timeline__title">Your recent bakes</h2>

          <p className="bake-log-timeline__description">
            Review past results, remember what worked, and improve your next
            loaf.
          </p>
        </div>

        {bakeLogs.length > 0 ? (
          <div className="bake-log-timeline__list">
            {bakeLogs.map((bakeLog) => (
              <BakeLogEntry
                key={bakeLog.id}
                bakeLog={bakeLog}
                onDelete={deleteBakeLog}
                onView={handleOpenDetails}
              />
            ))}
          </div>
        ) : (
          <div className="bake-log-timeline__empty">
            <div className="bake-log-timeline__empty-icon" aria-hidden="true">
              📓
            </div>

            <h3 className="bake-log-timeline__empty-title">
              Your journal is ready
            </h3>

            <p className="bake-log-timeline__empty-description">
              Add your first bake above and it will appear here.
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={Boolean(selectedBakeLog)}
        onClose={handleCloseDetails}
        title={selectedBakeLog?.recipeTitle || "Bake details"}
      >
        {selectedBakeLog && (
          <BakeLogDetails
            bakeLog={selectedBakeLog}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onClose={handleCloseDetails}
          />
        )}
      </Modal>
    </section>
  );
}

export default BakeLogTimeline;
