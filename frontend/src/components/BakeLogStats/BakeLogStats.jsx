import StatCard from "../StatCard/StatCard";
import StarRating from "../StarRating/StarRating";
import SectionHeading from "../SectionHeading/SectionHeading";
import {
  getAverageRating,
  getFavoriteRecipe,
  getHighestRatedBake,
  getLatestBake,
  getTotalBakes,
} from "../../utils/bakeLogStats";
import { formatDate } from "../../utils/formatDate";
import "./BakeLogStats.css";

function BakeLogStats({ bakeLogs }) {
  const totalBakes = getTotalBakes(bakeLogs);
  const averageRating = getAverageRating(bakeLogs);
  const favoriteRecipe = getFavoriteRecipe(bakeLogs);
  const highestRatedBake = getHighestRatedBake(bakeLogs);
  const latestBake = getLatestBake(bakeLogs);

  const hasBakeLogs = totalBakes > 0;

  return (
    <section className="bake-log-stats" aria-labelledby="bake-log-stats-title">
      <div className="bake-log-stats__container container">
        <SectionHeading
          eyebrow="Your progress"
          title="Baking statistics"
          description="See how your baking journey is growing with every journal entry."
        />

        <div className="bake-log-stats__grid">
          <StatCard
            label="Total bakes"
            value={totalBakes}
            helperText={
              totalBakes === 1
                ? "One bake recorded"
                : `${totalBakes} bakes recorded`
            }
            icon="📖"
          />

          <StatCard label="Average rating" icon="⭐">
            {hasBakeLogs ? (
              <StarRating
                rating={Number(averageRating)}
                showValue
                size="medium"
              />
            ) : (
              <p className="stat-card__value">—</p>
            )}
          </StatCard>

          <StatCard
            className="stat-card_compact-value"
            label="Most baked recipe"
            value={favoriteRecipe}
            helperText={
              hasBakeLogs
                ? "Your most frequently recorded recipe"
                : "Start logging bakes to see this"
            }
            icon="🥖"
          />

          <StatCard
            className="stat-card_compact-value"
            label="Highest-rated bake"
            value={highestRatedBake}
            helperText={
              hasBakeLogs
                ? "Your strongest recorded result"
                : "No ratings recorded yet"
            }
            icon="🏆"
          />

          <StatCard
            className="stat-card_compact-value stat-card_featured"
            label="Latest bake"
            value={latestBake === "—" ? "—" : formatDate(latestBake)}
            helperText={
              hasBakeLogs
                ? "Your most recent journal entry"
                : "Your latest bake will appear here"
            }
            icon="📅"
          />
        </div>
      </div>
    </section>
  );
}

export default BakeLogStats;
