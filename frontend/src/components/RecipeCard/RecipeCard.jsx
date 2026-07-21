import "./RecipeCard.css";

function RecipeCard({ recipe }) {
  return (
    <article className="recipe-card">
      <div className="recipe-card__image" aria-label={recipe.imageAlt}>
        <span>{recipe.category}</span>
      </div>

      <div className="recipe-card__content">
        <p className="recipe-card__category">{recipe.category}</p>
        <h3 className="recipe-card__title">{recipe.title}</h3>

        <div className="recipe-card__meta">
          <span>{recipe.difficulty}</span>
          <span>{recipe.bakeTime}</span>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
