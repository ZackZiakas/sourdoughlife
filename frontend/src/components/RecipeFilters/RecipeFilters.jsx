import recipeTags from "../../data/recipeTags";
import "./RecipeFilters.css";

function RecipeFilters({ activeFilter, onFilterChange }) {
  return (
    <section className="recipe-filters" aria-labelledby="recipe-filters-title">
      <div className="recipe-filters__container">
        <h2 id="recipe-filters-title" className="recipe-filters__title">
          Filter by category
        </h2>

        <div className="recipe-filters__list">
          {recipeTags.map((tag) => {
            const isActive = activeFilter === tag;

            return (
              <button
                key={tag}
                type="button"
                className={`recipe-filters__button ${
                  isActive ? "recipe-filters__button_active" : ""
                }`}
                aria-pressed={isActive}
                onClick={() => onFilterChange(tag)}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RecipeFilters;
