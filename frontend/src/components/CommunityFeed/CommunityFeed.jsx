import { useCommunity } from "../../contexts/CommunityContext";
import CommunityPostCard from "../CommunityPostCard/CommunityPostCard";
import SectionHeading from "../SectionHeading/SectionHeading";
import "./CommunityFeed.css";

function CommunityFeed() {
  const { posts, deletePost, togglePostLike } = useCommunity();

  return (
    <section className="community-feed">
      <div className="community-feed__container container">
        <div className="community-feed__top-row">
          <SectionHeading
            eyebrow="Community feed"
            title="Latest from our bakers"
            description="Celebrate successes, discover helpful ideas, and learn from every bake shared by the community."
          />

          <p className="community-feed__count">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="community-feed__grid">
            {posts.map((post) => (
              <CommunityPostCard
                key={post.id}
                post={post}
                onToggleLike={togglePostLike}
                onDelete={deletePost}
              />
            ))}
          </div>
        ) : (
          <div className="community-feed__empty">
            <div className="community-feed__empty-icon" aria-hidden="true">
              🥖
            </div>

            <h3 className="community-feed__empty-title">
              Be the first to share
            </h3>

            <p className="community-feed__empty-description">
              Create a post above and begin the conversation.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CommunityFeed;
