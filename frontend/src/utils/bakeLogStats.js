export function getTotalBakes(bakeLogs) {
  return bakeLogs.length;
}

export function getAverageRating(bakeLogs) {
  if (bakeLogs.length === 0) {
    return "—";
  }

  const totalRating = bakeLogs.reduce(
    (total, bakeLog) => total + bakeLog.rating,
    0,
  );

  return (totalRating / bakeLogs.length).toFixed(1);
}

export function getFavoriteRecipe(bakeLogs) {
  if (bakeLogs.length === 0) {
    return "—";
  }

  const recipeCounts = {};

  bakeLogs.forEach((bakeLog) => {
    recipeCounts[bakeLog.recipeTitle] =
      (recipeCounts[bakeLog.recipeTitle] || 0) + 1;
  });

  let favoriteRecipe = "";
  let highestCount = 0;

  Object.entries(recipeCounts).forEach(([recipe, count]) => {
    if (count > highestCount) {
      favoriteRecipe = recipe;
      highestCount = count;
    }
  });

  return favoriteRecipe;
}

export function getHighestRatedBake(bakeLogs) {
  if (bakeLogs.length === 0) {
    return "—";
  }

  const sortedBakeLogs = [...bakeLogs].sort((firstBake, secondBake) => {
    if (secondBake.rating !== firstBake.rating) {
      return secondBake.rating - firstBake.rating;
    }

    return (
      new Date(secondBake.bakeDate).getTime() -
      new Date(firstBake.bakeDate).getTime()
    );
  });

  return sortedBakeLogs[0].recipeTitle;
}

export function getLatestBake(bakeLogs) {
  if (bakeLogs.length === 0) {
    return "—";
  }

  const latestBake = [...bakeLogs].sort(
    (firstBake, secondBake) =>
      new Date(secondBake.bakeDate).getTime() -
      new Date(firstBake.bakeDate).getTime(),
  )[0];

  return latestBake.bakeDate;
}
