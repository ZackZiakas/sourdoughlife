import StarRating from "../StarRating/StarRating";
import "./CommunityPostCard.css";

function formatPostDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

function getAuthorInitial(author) {
  return author.trim().charAt(0).toUpperCase() || "?";
}

function CommunityPostCard({ post, onToggleLike, onDelete }) {
  return (
    <article className="community-post-card">
      <header className="community-post-card__header">
        <div className="community-post-card__author">
          <div className="community-post-card__avatar" aria-hidden="true">
            {getAuthorInitial(post.author)}
          </div>

          <div>
            <p className="community-post-card__author-name">{post.author}</p>

            <time
              className="community-post-card__date"
              dateTime={post.createdAt}
            >
              {formatPostDate(post.createdAt)}
            </time>
          </div>
        </div>

        {post.isOwnedByCurrentUser && (
          <span className="community-post-card__owner-label">Your post</span>
        )}
      </header>

      <div className="community-post-card__body">
        <p className="community-post-card__eyebrow">Latest bake</p>

        <h3 className="community-post-card__title">{post.recipeTitle}</h3>

        <StarRating
          className="community-post-card__rating"
          rating={post.rating}
          showValue
          size="small"
        />

        <p className="community-post-card__content">{post.content}</p>
      </div>

      <footer className="community-post-card__footer">
        <button
          className={`community-post-card__like ${
            post.likedByCurrentUser ? "community-post-card__like_active" : ""
          }`}
          type="button"
          onClick={() => onToggleLike(post.id)}
          aria-pressed={post.likedByCurrentUser}
          aria-label={
            post.likedByCurrentUser
              ? `Unlike ${post.author}'s post`
              : `Like ${post.author}'s post`
          }
        >
          <span aria-hidden="true">{post.likedByCurrentUser ? "♥" : "♡"}</span>

          <span>
            {post.likes} {post.likes === 1 ? "like" : "likes"}
          </span>
        </button>

        {post.isOwnedByCurrentUser && (
          <button
            className="community-post-card__delete"
            type="button"
            onClick={() => onDelete(post.id)}
            aria-label={`Delete your post about ${post.recipeTitle}`}
          >
            Delete
          </button>
        )}
      </footer>
    </article>
  );
}

export default CommunityPostCard;
