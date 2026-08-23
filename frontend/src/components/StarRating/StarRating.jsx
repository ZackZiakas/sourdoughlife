import "./StarRating.css";

function StarRating({
  rating,
  maxRating = 5,
  showValue = false,
  size = "medium",
  className = "",
}) {
  const normalizedRating = Math.max(
    0,
    Math.min(Number(rating) || 0, maxRating),
  );

  const roundedRating = Math.round(normalizedRating);
  const filledStars = "★".repeat(roundedRating);
  const emptyStars = "☆".repeat(maxRating - roundedRating);

  return (
    <div
      className={`star-rating star-rating_${size} ${className}`.trim()}
      aria-label={`${normalizedRating} out of ${maxRating} stars`}
    >
      <span className="star-rating__stars" aria-hidden="true">
        {filledStars}
        {emptyStars}
      </span>

      {showValue && (
        <span className="star-rating__value">
          {normalizedRating.toFixed(1)} / {maxRating}
        </span>
      )}
    </div>
  );
}

export default StarRating;
