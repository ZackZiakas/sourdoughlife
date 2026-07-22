import { useState } from "react";
import RecipesHero from "../../components/RecipesHero/RecipesHero";
import RecipeFilters from "../../components/RecipeFilters/RecipeFilters";
import "./Recipes.css";

function Recipes() {
  const [activeFilter, setActiveFilter] = useState("All");

  function handleFilterChange(filter) {
    setActiveFilter(filter);
  }

  return (
    <>
      <RecipesHero />

      <RecipeFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
    </>
  );
}

export default Recipes;
