import "./LandingBanner.css";
import easySourdoughImage from "../../assets/images/easy-sourdough-1.jpg";

function LandingBanner() {
  return (
    <section className="landing-banner">
      <div className="landing-banner__container container">
        <div className="landing-banner__content">
          <p className="landing-banner__eyebrow">Welcome to SourdoughLife</p>

          <h1 className="landing-banner__title">Helping Every Baker Rise.</h1>

          <p className="landing-banner__description">
            Learn, bake, and master sourdough with step-by-step recipes,
            personal bake logs, and a welcoming community built for bakers of
            every skill level.
          </p>

          <div className="landing-banner__actions">
            <button className="btn btn--primary">Browse Recipes</button>

            <button className="btn btn--secondary">Start Baking</button>
          </div>
        </div>

        <div className="landing-banner__image">
          <img
            src={easySourdoughImage}
            alt="Easy Sourdough Bread"
            className="landing-banner__hero-image"
          />
        </div>
      </div>
    </section>
  );
}

export default LandingBanner;
