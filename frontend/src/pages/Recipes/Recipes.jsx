import { useState } from "react";
import RecipesHero from "../../components/RecipesHero/RecipesHero";
import RecipeFilters from "../../components/RecipeFilters/RecipeFilters";
import RecipeResults from "../../components/RecipeResults/RecipeResults";
import featuredRecipes from "../../data/featuredRecipes";
import "./Recipes.css";

function Recipes() {
  const [activeFilter, setActiveFilter] = useState("All");

  function handleFilterChange(filter) {
    setActiveFilter(filter);
  }

  const filteredRecipes =
    activeFilter === "All"
      ? featuredRecipes
      : featuredRecipes.filter((recipe) => {
          const selectedCategory = activeFilter.replace(/^[^\s]+\s/, "");

          return recipe.category === selectedCategory;
        });

  return (
    <>
      <RecipesHero />

      <RecipeFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <RecipeResults recipes={filteredRecipes} />
    </>
  );
}

export default Recipes;
