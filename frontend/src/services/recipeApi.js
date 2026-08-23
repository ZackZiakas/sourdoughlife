const SPOONACULAR_BASE_URL = "https://api.spoonacular.com/recipes";

const apiKey = "e5d48cffe7c3412cae75de5301615e15";

export async function searchRecipes(query) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  if (!apiKey) {
    throw new Error("Spoonacular API key is missing.");
  }

  const searchParams = new URLSearchParams({
    apiKey,
    query: normalizedQuery,
    number: "9",
    addRecipeInformation: "true",
  });

  const response = await fetch(
    `${SPOONACULAR_BASE_URL}/complexSearch?${searchParams}`,
  );

  if (!response.ok) {
    throw new Error(
      `Spoonacular request failed with status ${response.status}.`,
    );
  }

  const data = await response.json();

  return data.results.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image || "",
    category: recipe.dishTypes?.[0] || "Recipe",
    difficulty: "API Recipe",
    time: recipe.readyInMinutes
      ? `${recipe.readyInMinutes} min`
      : "Time not available",
    sourceUrl: recipe.sourceUrl || "",
    sourceName: recipe.sourceName || "Spoonacular",
    isExternal: true,
  }));
}
