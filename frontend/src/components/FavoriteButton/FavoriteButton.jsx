import { useFavorites } from "../../contexts/FavoritesContext";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import "./FavoriteButton.css";

function FavoriteButton({ recipeId, recipeTitle, className = "" }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const recipeIsFavorite = isFavorite(recipeId);

  function handleFavoriteClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!isAuthenticated) {
      navigate("/sign-in", { state: { from: location } });
      return;
    }

    toggleFavorite(recipeId);
  }

  return (
    <button
      className={`favorite-button ${
        recipeIsFavorite ? "favorite-button_active" : ""
      } ${className}`}
      type="button"
      onClick={handleFavoriteClick}
      aria-pressed={recipeIsFavorite}
      aria-label={
        recipeIsFavorite
          ? `Remove ${recipeTitle} from favorites`
          : `Save ${recipeTitle} to favorites`
      }
    >
      <span aria-hidden="true">{recipeIsFavorite ? "♥" : "♡"}</span>
    </button>
  );
}

export default FavoriteButton;
