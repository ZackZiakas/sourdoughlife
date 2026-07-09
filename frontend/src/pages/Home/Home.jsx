import LandingBanner from "../../components/LandingBanner/LandingBanner";
import RecipeSearch from "../../components/RecipeSearch/RecipeSearch";
import "./Home.css";

function Home() {
  return (
    <main className="home">
      <LandingBanner />
      <RecipeSearch />
    </main>
  );
}

export default Home;
