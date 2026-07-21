import "./RecipeSearch.css";
import recipeTags from "../../data/recipeTags";

function RecipeSearch() {
  return (
    <section className="recipe-search">
      <div className="recipe-search__container container">
        <h2 className="recipe-search__title">
          What would you like to bake today?
        </h2>

        <p className="recipe-search__description">
          Search artisan sourdough recipes, discard recipes, pizza dough,
          bagels, focaccia, and more.
        </p>

        <form className="recipe-search__form">
          <input
            type="text"
            placeholder="Search recipes..."
            className="recipe-search__input"
          />

          <button type="submit" className="recipe-search__button">
            Search
          </button>
        </form>

        <div className="recipe-search__tags">
          {recipeTags.map((tag) => (
            <button key={tag} className="recipe-search__tag">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecipeSearch;
