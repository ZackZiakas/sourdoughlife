import "./RecipeSearch.css";

function RecipeSearch({ searchQuery, onSearchChange, onSearchSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    if (onSearchSubmit) {
      onSearchSubmit();
    }
  }

  return (
    <section className="recipe-search">
      <div className="recipe-search__container">
        <h2 className="recipe-search__title">Search recipes</h2>

        <form className="recipe-search__form" onSubmit={handleSubmit}>
          <label className="recipe-search__label" htmlFor="recipe-search-input">
            Search by recipe name or category
          </label>

          <div className="recipe-search__input-row">
            <input
              id="recipe-search-input"
              className="recipe-search__input"
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Try bagels, focaccia, or beginner..."
            />

            {searchQuery && (
              <button
                className="recipe-search__clear-button"
                type="button"
                onClick={() => onSearchChange("")}
              >
                Clear
              </button>
            )}

            {onSearchSubmit && (
              <button className="recipe-search__submit-button" type="submit">
                Search
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default RecipeSearch;
