import { Link } from "react-router-dom";
import "./RecipeCard.css";

function RecipeCard({ recipe }) {
  return (
    <article className="recipe-card">
      <Link
        className="recipe-card__link"
        to={`/recipes/${recipe.id}`}
        aria-label={`View recipe for ${recipe.title}`}
      >
        <div className="recipe-card__image-wrapper">
          {recipe.image ? (
            <img
              className="recipe-card__image"
              src={recipe.image}
              alt={recipe.title}
            />
          ) : (
            <div className="recipe-card__image-placeholder" />
          )}
        </div>

        <div className="recipe-card__content">
          <p className="recipe-card__category">{recipe.category}</p>

          <h3 className="recipe-card__title">{recipe.title}</h3>

          <div className="recipe-card__details">
            <span>{recipe.difficulty}</span>
            <span>{recipe.time}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default RecipeCard;
