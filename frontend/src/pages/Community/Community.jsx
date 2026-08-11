import CommunityHero from "../../components/CommunityHero/CommunityHero";
import CommunityPostForm from "../../components/CommunityPostForm/CommunityPostForm";
import CommunityFeed from "../../components/CommunityFeed/CommunityFeed";
import "./Community.css";

function Community() {
  return (
    <main className="community">
      <CommunityHero />
      <CommunityPostForm />
      <CommunityFeed />
    </main>
  );
}

export default Community;
