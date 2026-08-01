import "./BakeLogHero.css";

function BakeLogHero() {
  return (
    <section className="bake-log-hero">
      <div className="bake-log-hero__container container">
        <p className="bake-log-hero__eyebrow">Your baking journey</p>

        <h1 className="bake-log-hero__title">My Baking Journal</h1>

        <p className="bake-log-hero__description">
          Record every loaf, experiment, and lesson learned. Each entry helps
          you understand what worked, what changed, and how your baking
          continues to improve.
        </p>

        <p className="bake-log-hero__message">
          Every great baker improves one bake at a time.
        </p>
      </div>
    </section>
  );
}

export default BakeLogHero;
