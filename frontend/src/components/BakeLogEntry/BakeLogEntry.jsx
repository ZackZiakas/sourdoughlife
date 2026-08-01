import "./BakeLogEntry.css";

function BakeLogEntry({ bakeLog, onDelete, onView }) {
  const formattedDate = new Date(
    `${bakeLog.bakeDate}T00:00:00`,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const filledStars = "★".repeat(bakeLog.rating);
  const emptyStars = "☆".repeat(5 - bakeLog.rating);

  return (
    <article className="bake-log-entry">
      <div className="bake-log-entry__header">
        <div>
          <p className="bake-log-entry__date">{formattedDate}</p>

          <h3 className="bake-log-entry__title">{bakeLog.recipeTitle}</h3>
        </div>

        <div className="bake-log-entry__actions">
          <button
            className="bake-log-entry__view"
            type="button"
            onClick={() => onView(bakeLog)}
          >
            View Details
          </button>

          <button
            className="bake-log-entry__delete"
            type="button"
            onClick={() => onDelete(bakeLog.id)}
            aria-label={`Delete bake log for ${bakeLog.recipeTitle}`}
          >
            Delete
          </button>
        </div>
      </div>

      <p
        className="bake-log-entry__rating"
        aria-label={`${bakeLog.rating} out of 5 stars`}
      >
        <span aria-hidden="true">
          {filledStars}
          {emptyStars}
        </span>
      </p>

      <p className="bake-log-entry__notes">{bakeLog.notes}</p>
    </article>
  );
}

export default BakeLogEntry;
