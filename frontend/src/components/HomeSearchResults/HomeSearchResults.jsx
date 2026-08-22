import RecipeCard from "../RecipeCard/RecipeCard";
import "./HomeSearchResults.css";

function HomeSearchResults({
  recipes,
  isLoading,
  error,
  searchQuery,
  onViewAllResults,
}) {
  let content;

  if (isLoading) {
    content = (
      <div className="home-search-results__state">
        <div className="home-search-results__spinner" aria-hidden="true" />

        <p className="home-search-results__state-text">Searching recipes...</p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="home-search-results__state">
        <p className="home-search-results__state-title">
          Unable to load recipes
        </p>

        <p className="home-search-results__state-text">{error}</p>
      </div>
    );
  } else if (recipes.length > 0) {
    content = (
      <>
        <div className="home-search-results__grid">
          {recipes.map((recipe) => (
            <RecipeCard key={`home-api-${recipe.id}`} recipe={recipe} />
          ))}
        </div>

        <button
          className="home-search-results__view-all"
          type="button"
          onClick={onViewAllResults}
        >
          View all results
        </button>
      </>
    );
  } else {
    content = (
      <div className="home-search-results__state">
        <p className="home-search-results__state-title">No recipes found</p>

        <p className="home-search-results__state-text">
          No results matched “{searchQuery}”. Try another search.
        </p>
      </div>
    );
  }

  return (
    <section
      className="home-search-results"
      aria-labelledby="home-search-results-title"
      aria-live="polite"
    >
      <div className="home-search-results__container container">
        <div className="home-search-results__header">
          <div>
            <p className="home-search-results__eyebrow">Search results</p>

            <h2
              id="home-search-results-title"
              className="home-search-results__title"
            >
              Recipes for “{searchQuery}”
            </h2>
          </div>

          {!isLoading && !error && recipes.length > 0 && (
            <p className="home-search-results__count">
              Showing {recipes.length} preview{" "}
              {recipes.length === 1 ? "recipe" : "recipes"}
            </p>
          )}
        </div>

        {content}
      </div>
    </section>
  );
}

export default HomeSearchResults;
