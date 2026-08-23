import { useState } from "react";
import { useCommunity } from "../../contexts/CommunityContext";
import featuredRecipes from "../../data/featuredRecipes";
import SectionHeading from "../SectionHeading/SectionHeading";
import "./CommunityPostForm.css";

const initialFormValues = {
  author: "Zach",
  recipeId: "",
  rating: "5",
  content: "",
};

function CommunityPostForm() {
  const { addPost } = useCommunity();

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setFormError("");
    setSuccessMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const selectedRecipe = featuredRecipes.find(
      (recipe) => recipe.id === Number(formValues.recipeId),
    );

    if (!selectedRecipe || !formValues.content.trim()) {
      setFormError(
        "Please choose a recipe and write something about your bake.",
      );
      return;
    }

    addPost({
      author: formValues.author,
      recipeTitle: selectedRecipe.title,
      rating: formValues.rating,
      content: formValues.content,
    });

    setFormValues((currentValues) => ({
      ...initialFormValues,
      author: currentValues.author,
    }));

    setSuccessMessage("Your bake has been shared with the community.");
  }

  return (
    <section className="community-post-form-section">
      <div className="community-post-form-section__container container">
        <SectionHeading
          eyebrow="Share your progress"
          title="Post your latest bake"
          description="Tell the community what you baked, how it turned out, and what you learned along the way."
        />

        <form
          className="community-post-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="community-post-form__field">
            <label
              className="community-post-form__label"
              htmlFor="community-author"
            >
              Display name
            </label>

            <input
              id="community-author"
              className="community-post-form__control"
              type="text"
              name="author"
              value={formValues.author}
              onChange={handleInputChange}
              placeholder="Your name"
            />
          </div>

          <div className="community-post-form__row">
            <div className="community-post-form__field">
              <label
                className="community-post-form__label"
                htmlFor="community-recipe"
              >
                Recipe
              </label>

              <select
                id="community-recipe"
                className="community-post-form__control"
                name="recipeId"
                value={formValues.recipeId}
                onChange={handleInputChange}
              >
                <option value="">Choose a recipe</option>

                {featuredRecipes.map((recipe) => (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="community-post-form__field">
              <label
                className="community-post-form__label"
                htmlFor="community-rating"
              >
                Rating
              </label>

              <select
                id="community-rating"
                className="community-post-form__control"
                name="rating"
                value={formValues.rating}
                onChange={handleInputChange}
              >
                <option value="5">5 — Excellent</option>
                <option value="4">4 — Very good</option>
                <option value="3">3 — Good</option>
                <option value="2">2 — Needs improvement</option>
                <option value="1">1 — Try again</option>
              </select>
            </div>
          </div>

          <div className="community-post-form__field">
            <label
              className="community-post-form__label"
              htmlFor="community-content"
            >
              What would you like to share?
            </label>

            <textarea
              id="community-content"
              className="community-post-form__control community-post-form__textarea"
              name="content"
              value={formValues.content}
              onChange={handleInputChange}
              placeholder="How was the rise, crumb, crust, flavor, or overall result? What would you change next time?"
              rows="6"
              maxLength="800"
            />

            <p className="community-post-form__character-count">
              {formValues.content.length} / 800
            </p>
          </div>

          {formError && (
            <p className="community-post-form__message community-post-form__message_error">
              {formError}
            </p>
          )}

          {successMessage && (
            <p className="community-post-form__message community-post-form__message_success">
              {successMessage}
            </p>
          )}

          <button className="community-post-form__submit" type="submit">
            Share Bake
          </button>
        </form>
      </div>
    </section>
  );
}

export default CommunityPostForm;
