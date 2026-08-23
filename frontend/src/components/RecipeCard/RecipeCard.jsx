import { Link } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import "./RecipeCard.css";

function RecipeCard({ recipe }) {
  const isExternalRecipe = recipe.isExternal === true;

  const cardContent = (
    <>
      <div className="recipe-card__image-wrapper">
        {recipe.image ? (
          <img
            className="recipe-card__image"
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
          />
        ) : (
          <div className="recipe-card__image-placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="recipe-card__content">
        <p className="recipe-card__category">{recipe.category}</p>

        <h3 className="recipe-card__title">{recipe.title}</h3>

        <div className="recipe-card__details">
          <span>{recipe.difficulty}</span>

          {recipe.time && <span>{recipe.time}</span>}
        </div>

        {isExternalRecipe && (
          <p className="recipe-card__source">Recipe via Spoonacular</p>
        )}
      </div>
    </>
  );

  return (
    <article className="recipe-card">
      <FavoriteButton
        className="recipe-card__favorite"
        recipeId={recipe.id}
        recipeTitle={recipe.title}
      />

      {isExternalRecipe ? (
        <a
          className="recipe-card__link"
          href={recipe.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${recipe.title} recipe`}
        >
          {cardContent}
        </a>
      ) : (
        <Link
          className="recipe-card__link"
          to={`/recipes/${recipe.id}`}
          aria-label={`View recipe for ${recipe.title}`}
        >
          {cardContent}
        </Link>
      )}
    </article>
  );
}

export default RecipeCard;
