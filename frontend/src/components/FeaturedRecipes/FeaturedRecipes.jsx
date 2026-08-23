import RecipeCard from "../RecipeCard/RecipeCard";
import featuredRecipes from "../../data/featuredRecipes";
import "./FeaturedRecipes.css";

function FeaturedRecipes() {
  return (
    <section className="featured-recipes">
      <div className="featured-recipes__container container">
        <div className="featured-recipes__header">
          <p className="featured-recipes__eyebrow">Featured recipes</p>
          <h2 className="featured-recipes__title">Start with a trusted bake</h2>
          <p className="featured-recipes__description">
            Explore beginner-friendly loaves, discard recipes, and sourdough
            favorites to build confidence one recipe at a time.
          </p>
        </div>

        <div className="featured-recipes__grid">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedRecipes;
