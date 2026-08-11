import StarRating from "../StarRating/StarRating";
import { formatDate } from "../../utils/formatDate";
import "./BakeLogDetails.css";

function BakeLogDetails({ bakeLog, onEdit, onDelete, onClose }) {
  return (
    <div className="bake-log-details">
      <dl className="bake-log-details__summary">
        <div className="bake-log-details__summary-item">
          <dt>Recipe</dt>
          <dd>{bakeLog.recipeTitle}</dd>
        </div>

        <div className="bake-log-details__summary-item">
          <dt>Bake date</dt>
          <dd>{formatDate(bakeLog.bakeDate)}</dd>
        </div>

        <div className="bake-log-details__summary-item">
          <dt>Rating</dt>

          <dd className="bake-log-details__rating">
            <StarRating rating={bakeLog.rating} showValue size="small" />
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
