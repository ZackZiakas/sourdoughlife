import RecipeCard from "../RecipeCard/RecipeCard";
import "./RecipeResults.css";

function RecipeResults({ recipes, isLoading = false, error = "" }) {
  let content;

  if (isLoading) {
    content = (
      <div className="recipe-results__state">
        <div className="recipe-results__spinner" aria-hidden="true" />

        <h3 className="recipe-results__state-title">Searching recipes...</h3>

        <p className="recipe-results__state-description">
          Finding recipes that match your search.
        </p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="recipe-results__state">
        <div className="recipe-results__state-icon" aria-hidden="true">
          !
        </div>

        <h3 className="recipe-results__state-title">Unable to load recipes</h3>

        <p className="recipe-results__state-description">{error}</p>
      </div>
    );
  } else if (recipes.length > 0) {
    content = (
      <div className="recipe-results__grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={`${recipe.isExternal ? "api" : "local"}-${recipe.id}`}
            recipe={recipe}
          />
        ))}
      </div>
    );
  } else {
    content = (
      <div className="recipe-results__state">
        <div className="recipe-results__state-icon" aria-hidden="true">
          🔍
        </div>

        <h3 className="recipe-results__state-title">No recipes found</h3>

        <p className="recipe-results__state-description">
          Try another search or browse the available recipes.
        </p>
      </div>
    );
  }

  return (
    <section
      className="recipe-results"
      aria-labelledby="recipe-results-title"
      aria-live="polite"
    >
      <div className="recipe-results__container container">
        <div className="recipe-results__header">
          <h2 id="recipe-results-title" className="recipe-results__title">
            Recipe results
          </h2>

          {!isLoading && !error && (
            <p className="recipe-results__count">
              Showing {recipes.length}{" "}
              {recipes.length === 1 ? "recipe" : "recipes"}
            </p>
          )}
        </div>

        {content}
      </div>
    </section>
  );
}

export default RecipeResults;
