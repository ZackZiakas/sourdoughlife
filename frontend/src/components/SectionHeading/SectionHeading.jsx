import "./SectionHeading.css";

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  return (
    <div
      className={`section-heading section-heading_${align} ${className}`.trim()}
    >
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}

      <h2 className="section-heading__title">{title}</h2>

      {description && (
        <p className="section-heading__description">{description}</p>
      )}
    </div>
  );
}

export default SectionHeading;
