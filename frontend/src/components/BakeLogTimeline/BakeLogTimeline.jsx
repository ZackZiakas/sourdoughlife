import { useMemo, useState } from "react";
import { useBakeLogs } from "../../contexts/BakeLogContext";
import BakeLogEntry from "../BakeLogEntry/BakeLogEntry";
import BakeLogDetails from "../BakeLogDetails/BakeLogDetails";
import Modal from "../Modal/Modal";
import "./BakeLogTimeline.css";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "highest-rated", label: "Highest Rated" },
  { value: "lowest-rated", label: "Lowest Rated" },
  { value: "recipe-name", label: "Recipe Name" },
];

function BakeLogTimeline({ onEditBake }) {
  const { bakeLogs, deleteBakeLog } = useBakeLogs();

  const [selectedBakeLog, setSelectedBakeLog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const visibleBakeLogs = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const matchingBakeLogs = bakeLogs.filter((bakeLog) => {
      if (!normalizedSearch) {
        return true;
      }

      return (
        bakeLog.recipeTitle.toLowerCase().includes(normalizedSearch) ||
        bakeLog.notes.toLowerCase().includes(normalizedSearch)
      );
    });

    return [...matchingBakeLogs].sort((firstBakeLog, secondBakeLog) => {
      switch (sortOption) {
        case "oldest":
          return (
            new Date(firstBakeLog.bakeDate).getTime() -
            new Date(secondBakeLog.bakeDate).getTime()
          );

        case "highest-rated":
          return secondBakeLog.rating - firstBakeLog.rating;

        case "lowest-rated":
          return firstBakeLog.rating - secondBakeLog.rating;

        case "recipe-name":
          return firstBakeLog.recipeTitle.localeCompare(
            secondBakeLog.recipeTitle,
          );

        case "newest":
        default:
          return (
            new Date(secondBakeLog.bakeDate).getTime() -
            new Date(firstBakeLog.bakeDate).getTime()
          );
      }
    });
  }, [bakeLogs, searchQuery, sortOption]);

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
    if (!selectedBakeLog) {
      return;
    }

    onEditBake(selectedBakeLog);
    handleCloseDetails();
  }

  function handleClearSearch() {
    setSearchQuery("");
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

        {bakeLogs.length > 0 && (
          <div className="bake-log-timeline__controls">
            <div className="bake-log-timeline__search-group">
              <label
                className="bake-log-timeline__label"
                htmlFor="journal-search"
              >
                Search journal
              </label>

              <div className="bake-log-timeline__search-row">
                <input
                  id="journal-search"
                  className="bake-log-timeline__search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by recipe or notes..."
                />

                {searchQuery && (
                  <button
                    className="bake-log-timeline__clear-button"
                    type="button"
                    onClick={handleClearSearch}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="bake-log-timeline__sort-group">
              <label
                className="bake-log-timeline__label"
                htmlFor="journal-sort"
              >
                Sort by
              </label>

              <select
                id="journal-sort"
                className="bake-log-timeline__sort-select"
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {bakeLogs.length === 0 ? (
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
        ) : visibleBakeLogs.length > 0 ? (
          <>
            <p className="bake-log-timeline__results-count">
              Showing {visibleBakeLogs.length}{" "}
              {visibleBakeLogs.length === 1 ? "entry" : "entries"}
            </p>

            <div className="bake-log-timeline__list">
              {visibleBakeLogs.map((bakeLog) => (
                <BakeLogEntry
                  key={bakeLog.id}
                  bakeLog={bakeLog}
                  onDelete={deleteBakeLog}
                  onView={handleOpenDetails}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="bake-log-timeline__empty">
            <div className="bake-log-timeline__empty-icon" aria-hidden="true">
              🔍
            </div>

            <h3 className="bake-log-timeline__empty-title">
              No journal entries found
            </h3>

            <p className="bake-log-timeline__empty-description">
              No entries match “{searchQuery}”. Try another search.
            </p>

            <button
              className="bake-log-timeline__empty-button"
              type="button"
              onClick={handleClearSearch}
            >
              Clear search
            </button>
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
