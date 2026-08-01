import { Link } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useFavorites } from "../../contexts/FavoritesContext";
import featuredRecipes from "../../data/featuredRecipes";
import { useBakeLogs } from "../../contexts/BakeLogContext";
import "./Profile.css";

function Profile() {
  const { favoriteRecipeIds } = useFavorites();
  const { bakeLogs } = useBakeLogs();
  const bakeLogCount = bakeLogs.length;

  const favoriteRecipes = featuredRecipes.filter((recipe) =>
    favoriteRecipeIds.includes(recipe.id),
  );

  const favoriteCount = favoriteRecipes.length;

  return (
    <main className="profile">
      <section className="profile__hero">
        <div className="profile__container profile__hero-content">
          <div className="profile__avatar" aria-hidden="true">
            Z
          </div>

          <div className="profile__intro">
            <p className="profile__eyebrow">Baker profile</p>

            <h1 className="profile__title">Welcome back, Zach</h1>

            <p className="profile__description">
              Keep track of the recipes you love and continue building your
              sourdough journey.
            </p>
          </div>
        </div>
      </section>

      <section className="profile__content">
        <div className="profile__container">
          <div className="profile__summary-grid">
            <article className="profile__summary-card">
              <span className="profile__summary-label">Saved recipes</span>
              <strong className="profile__summary-value">
                {favoriteCount}
              </strong>
            </article>

            <article className="profile__summary-card">
              <span className="profile__summary-label">Bake logs</span>

              <strong className="profile__summary-value">{bakeLogCount}</strong>
            </article>

            <article className="profile__summary-card">
              <span className="profile__summary-label">Baking level</span>
              <strong className="profile__summary-text">Beginner</strong>
            </article>
          </div>

          <div className="profile__section-heading">
            <div>
              <p className="profile__eyebrow">Your collection</p>

              <h2 className="profile__section-title">Saved recipes</h2>
            </div>

            {favoriteCount > 0 && (
              <Link className="profile__browse-link" to="/recipes">
                Browse more recipes
              </Link>
            )}
          </div>

          {favoriteCount > 0 ? (
            <div className="profile__recipes-grid">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="profile__empty-state">
              <div className="profile__empty-icon" aria-hidden="true">
                ♡
              </div>

              <h3 className="profile__empty-title">No saved recipes yet</h3>

              <p className="profile__empty-description">
                Save recipes using the heart button and they will appear here
                for easy access.
              </p>

              <Link className="profile__empty-link" to="/recipes">
                Explore recipes
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Profile;
