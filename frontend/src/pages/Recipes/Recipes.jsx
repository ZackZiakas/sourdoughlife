import { useState } from "react";
import RecipesHero from "../../components/RecipeHero/RecipesHero";
import RecipeSearch from "../../components/RecipeSearch/RecipeSearch";
import RecipeFilters from "../../components/RecipeFilters/RecipeFilters";
import RecipeResults from "../../components/RecipeResults/RecipeResults";
import featuredRecipes from "../../data/featuredRecipes";
import "./Recipes.css";

function Recipes() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  function handleFilterChange(filter) {
    setActiveFilter(filter);
  }

  function handleSearchChange(value) {
    setSearchQuery(value);
  }

  const selectedCategory = activeFilter.replace(/^[^\s]+\s/, "");
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredRecipes = featuredRecipes.filter((recipe) => {
    const matchesCategory =
      activeFilter === "All" || recipe.category === selectedCategory;

    const matchesSearch =
      normalizedSearch === "" ||
      recipe.title.toLowerCase().includes(normalizedSearch) ||
      recipe.category.toLowerCase().includes(normalizedSearch) ||
      recipe.difficulty.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <RecipesHero />

      <RecipeSearch
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <RecipeFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <RecipeResults recipes={filteredRecipes} />
    </>
  );
}

export default Recipes;
