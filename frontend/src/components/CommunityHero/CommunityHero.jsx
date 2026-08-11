import "./CommunityHero.css";

function CommunityHero() {
  return (
    <section className="community-hero">
      <div className="community-hero__container container">
        <p className="community-hero__eyebrow">Learn together</p>

        <h1 className="community-hero__title">The Sourdough Community</h1>

        <p className="community-hero__description">
          Share your latest bake, celebrate your progress, and learn from bakers
          who are improving one loaf at a time.
        </p>

        <p className="community-hero__message">
          Every bake has something worth sharing.
        </p>
      </div>
    </section>
  );
}

export default CommunityHero;
