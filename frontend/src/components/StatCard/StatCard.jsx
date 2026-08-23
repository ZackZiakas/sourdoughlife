import "./StatCard.css";

function StatCard({
  label,
  value,
  helperText = "",
  icon = null,
  children = null,
  className = "",
}) {
  return (
    <article className={`stat-card ${className}`.trim()}>
      <div className="stat-card__header">
        <p className="stat-card__label">{label}</p>

        {icon && (
          <span className="stat-card__icon" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      <div className="stat-card__content">
        {children || <p className="stat-card__value">{value}</p>}

        {helperText && <p className="stat-card__helper-text">{helperText}</p>}
      </div>
    </article>
  );
}

export default StatCard;
