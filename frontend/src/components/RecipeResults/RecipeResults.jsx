import RecipeCard from "../RecipeCard/RecipeCard";
import "./RecipeResults.css";

function RecipeResults({ recipes }) {
  return (
    <section className="recipe-results" aria-labelledby="recipe-results-title">
      <div className="recipe-results__container">
        <div className="recipe-results__header">
          <h2 id="recipe-results-title" className="recipe-results__title">
            Recipe results
          </h2>

          <p className="recipe-results__count">
            Showing {recipes.length}{" "}
            {recipes.length === 1 ? "recipe" : "recipes"}
          </p>
        </div>

        {recipes.length > 0 ? (
          <div className="recipe-results__grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="recipe-results__empty">
            <h3>No recipes found</h3>
            <p>
              Try selecting another category or browse all available recipes.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecipeResults;
