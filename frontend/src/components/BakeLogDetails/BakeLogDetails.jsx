import "./BakeLogDetails.css";

function BakeLogDetails({ bakeLog, onEdit, onDelete, onClose }) {
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
    <div className="bake-log-details">
      <dl className="bake-log-details__summary">
        <div className="bake-log-details__summary-item">
          <dt>Recipe</dt>
          <dd>{bakeLog.recipeTitle}</dd>
        </div>

        <div className="bake-log-details__summary-item">
          <dt>Bake date</dt>
          <dd>{formattedDate}</dd>
        </div>

        <div className="bake-log-details__summary-item">
          <dt>Rating</dt>
          <dd
            className="bake-log-details__rating"
            aria-label={`${bakeLog.rating} out of 5 stars`}
          >
            <span aria-hidden="true">
              {filledStars}
              {emptyStars}
            </span>
          </dd>
        </div>
      </dl>

      <section className="bake-log-details__notes">
        <h3 className="bake-log-details__notes-title">Baking notes</h3>
        <p className="bake-log-details__notes-text">{bakeLog.notes}</p>
      </section>

      <div className="bake-log-details__actions">
        <button
          className="bake-log-details__button bake-log-details__button_secondary"
          type="button"
          onClick={onClose}
        >
          Close
        </button>

        <button
          className="bake-log-details__button bake-log-details__button_edit"
          type="button"
          onClick={onEdit}
        >
          Edit Bake
        </button>

        <button
          className="bake-log-details__button bake-log-details__button_delete"
          type="button"
          onClick={() => onDelete(bakeLog.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BakeLogDetails;
