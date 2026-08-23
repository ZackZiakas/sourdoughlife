import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingBanner from "../../components/LandingBanner/LandingBanner";
import RecipeSearch from "../../components/RecipeSearch/RecipeSearch";
import FeaturedRecipes from "../../components/FeaturedRecipes/FeaturedRecipes";
import HomeSearchResults from "../../components/HomeSearchResults/HomeSearchResults";
import { searchRecipes } from "../../services/recipeApi";
import "./Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [previewRecipes, setPreviewRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const navigate = useNavigate();

  function handleSearchChange(value) {
    setSearchQuery(value);
  }

  function handleSearchSubmit() {
    const normalizedSearch = searchQuery.trim();

    if (!normalizedSearch) {
      return;
    }

    navigate(`/recipes?search=${encodeURIComponent(normalizedSearch)}`);
  }

  function handleViewAllResults() {
    handleSearchSubmit();
  }

  useEffect(() => {
    const query = searchQuery.trim();

    if (!query) {
      return undefined;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        setSearchError("");

        const results = await searchRecipes(query);

        setPreviewRecipes(results.slice(0, 3));
      } catch (error) {
        console.error("Home recipe search failed:", error);

        setSearchError("We couldn't load recipes right now. Please try again.");

        setPreviewRecipes([]);
      } finally {
        setIsLoading(false);
      }
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const hasSearchQuery = searchQuery.trim() !== "";

  return (
    <main className="home">
      <LandingBanner />

      <RecipeSearch
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      {hasSearchQuery && (
        <HomeSearchResults
          recipes={previewRecipes}
          isLoading={isLoading}
          error={searchError}
          searchQuery={searchQuery}
          onViewAllResults={handleViewAllResults}
        />
      )}

      <FeaturedRecipes />
    </main>
  );
}

export default Home;
