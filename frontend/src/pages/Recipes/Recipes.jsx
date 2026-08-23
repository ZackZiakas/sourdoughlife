import { useEffect, useState } from "react";
import RecipesHero from "../../components/RecipeHero/RecipesHero";
import RecipeSearch from "../../components/RecipeSearch/RecipeSearch";
import RecipeFilters from "../../components/RecipeFilters/RecipeFilters";
import RecipeResults from "../../components/RecipeResults/RecipeResults";
import featuredRecipes from "../../data/featuredRecipes";
import { searchRecipes } from "../../services/recipeApi";
import "./Recipes.css";

function Recipes() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [apiRecipes, setApiRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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

  useEffect(() => {
    const query = searchQuery.trim();

    if (!query) {
      return undefined;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        setApiError("");

        const results = await searchRecipes(query);

        setApiRecipes(results);
      } catch (error) {
        console.error("Recipe API search failed:", error);

        setApiError("We couldn't load recipes right now. Please try again.");

        setApiRecipes([]);
      } finally {
        setIsLoading(false);
      }
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const displayedRecipes =
    normalizedSearch === "" ? filteredRecipes : apiRecipes;

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

      <RecipeResults
        recipes={displayedRecipes}
        isLoading={normalizedSearch !== "" && isLoading}
        error={normalizedSearch !== "" ? apiError : ""}
      />
    </>
  );
}

export default Recipes;
