import StarRating from "../StarRating/StarRating";
import { formatDate } from "../../utils/formatDate";
import "./BakeLogEntry.css";

function BakeLogEntry({ bakeLog, onDelete, onView }) {
  return (
    <article className="bake-log-entry">
      <div className="bake-log-entry__header">
        <div>
          <p className="bake-log-entry__date">{formatDate(bakeLog.bakeDate)}</p>

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

      <StarRating
        className="bake-log-entry__rating"
        rating={bakeLog.rating}
        size="medium"
      />

      <p className="bake-log-entry__notes">{bakeLog.notes}</p>
    </article>
  );
}

export default BakeLogEntry;
