import LandingBanner from "../../components/LandingBanner/LandingBanner";
import RecipeSearch from "../../components/RecipeSearch/RecipeSearch";
import FeaturedRecipes from "../../components/FeaturedRecipes/FeaturedRecipes";
import "./Home.css";

function Home() {
  return (
    <main className="home">
      <LandingBanner />
      <RecipeSearch />
      <FeaturedRecipes />
    </main>
  );
}

export default Home;
