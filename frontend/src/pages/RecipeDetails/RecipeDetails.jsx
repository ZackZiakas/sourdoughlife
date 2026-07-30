import { Link, useParams } from "react-router-dom";
import featuredRecipes from "../../data/featuredRecipes";
import "./RecipeDetails.css";

function RecipeDetails() {
  const { recipeId } = useParams();

  const recipe = featuredRecipes.find(
    (currentRecipe) => currentRecipe.id === Number(recipeId),
  );

  if (!recipe) {
    return (
      <main className="recipe-details recipe-details_not-found">
        <div className="recipe-details__container">
          <p className="recipe-details__eyebrow">Recipe unavailable</p>
          <h1 className="recipe-details__title">Recipe Not Found</h1>
          <p className="recipe-details__description">
            We could not find the recipe you were looking for.
          </p>

          <Link className="recipe-details__back-link" to="/recipes">
            Back to recipes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="recipe-details">
      <section className="recipe-details__hero">
        <div className="recipe-details__container recipe-details__hero-grid">
          <div className="recipe-details__content">
            <Link className="recipe-details__back-link" to="/recipes">
              ← Back to recipes
            </Link>

            <p className="recipe-details__eyebrow">{recipe.category}</p>

            <h1 className="recipe-details__title">{recipe.title}</h1>

            <p className="recipe-details__description">{recipe.description}</p>

            <div className="recipe-details__meta">
              <div className="recipe-details__meta-item">
                <span className="recipe-details__meta-label">Difficulty</span>
                <span>{recipe.difficulty}</span>
              </div>

              <div className="recipe-details__meta-item">
                <span className="recipe-details__meta-label">Total time</span>
                <span>{recipe.time}</span>
              </div>
            </div>
          </div>

          <div className="recipe-details__image-wrapper">
            {recipe.image ? (
              <img
                className="recipe-details__image"
                src={recipe.image}
                alt={recipe.title}
              />
            ) : (
              <div className="recipe-details__image-placeholder">
                <span>Recipe image coming soon</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="recipe-details__body">
        <div className="recipe-details__container recipe-details__body-grid">
          <article className="recipe-details__panel">
            <h2 className="recipe-details__section-title">Ingredients</h2>

            {recipe.ingredients?.length > 0 ? (
              <ul className="recipe-details__ingredients">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={`${recipe.id}-ingredient-${index}`}>{ingredient}</li>
                ))}
              </ul>
            ) : (
              <p className="recipe-details__empty-message">
                Ingredients will be added soon.
              </p>
            )}
          </article>

          <article className="recipe-details__panel">
            <h2 className="recipe-details__section-title">Instructions</h2>

            {recipe.instructions?.length > 0 ? (
              <ol className="recipe-details__instructions">
                {recipe.instructions.map((instruction, index) => (
                  <li key={`${recipe.id}-instruction-${index}`}>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="recipe-details__empty-message">
                Instructions will be added soon.
              </p>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}

export default RecipeDetails;
