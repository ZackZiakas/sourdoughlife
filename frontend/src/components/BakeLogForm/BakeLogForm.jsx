import { useState } from "react";
import { useBakeLogs } from "../../contexts/BakeLogContext";
import featuredRecipes from "../../data/featuredRecipes";
import "./BakeLogForm.css";

const initialFormValues = {
  recipeId: "",
  bakeDate: "",
  rating: "5",
  notes: "",
};

function createFormValuesFromBakeLog(bakeLog) {
  return {
    recipeId: String(bakeLog.recipeId),
    bakeDate: bakeLog.bakeDate,
    rating: String(bakeLog.rating),
    notes: bakeLog.notes,
  };
}

function BakeLogForm({ editingBakeLog, onCancelEdit, onEditComplete }) {
  const { addBakeLog, updateBakeLog } = useBakeLogs();
  const [formValues, setFormValues] = useState(() =>
    editingBakeLog
      ? createFormValuesFromBakeLog(editingBakeLog)
      : initialFormValues,
  );
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isEditing = Boolean(editingBakeLog);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setFormError("");
    setSuccessMessage("");
  }

  function resetForm() {
    setFormValues(initialFormValues);
    setFormError("");
  }

  function handleCancel() {
    resetForm();
    setSuccessMessage("");
    onCancelEdit();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const selectedRecipe = featuredRecipes.find(
      (recipe) => recipe.id === Number(formValues.recipeId),
    );

    if (!selectedRecipe || !formValues.bakeDate || !formValues.notes.trim()) {
      setFormError(
        "Please choose a recipe, select a bake date, and add your baking notes.",
      );
      return;
    }

    const bakeLogData = {
      recipeId: selectedRecipe.id,
      recipeTitle: selectedRecipe.title,
      bakeDate: formValues.bakeDate,
      rating: formValues.rating,
      notes: formValues.notes,
    };

    if (isEditing) {
      updateBakeLog(editingBakeLog.id, bakeLogData);
      resetForm();
      setSuccessMessage("Your bake journal entry has been updated.");
      onEditComplete();
      return;
    }

    addBakeLog(bakeLogData);
    resetForm();
    setSuccessMessage("Your bake has been added to your journal.");
  }

  return (
    <section className="bake-log-form-section">
      <div className="bake-log-form-section__container container">
        <div className="bake-log-form-section__heading">
          <p className="bake-log-form-section__eyebrow">
            {isEditing ? "Update your journal" : "Record a bake"}
          </p>

          <h2 className="bake-log-form-section__title">
            {isEditing ? "Edit your baking notes" : "What did you bake today?"}
          </h2>

          <p className="bake-log-form-section__description">
            {isEditing
              ? "Update the recipe details, rating, or notes from this bake."
              : "Record the recipe, result, and anything you would like to remember for your next bake."}
          </p>
        </div>

        <form className="bake-log-form" onSubmit={handleSubmit} noValidate>
          <div className="bake-log-form__field">
            <label className="bake-log-form__label" htmlFor="recipeId">
              Recipe
            </label>

            <select
              id="recipeId"
              className="bake-log-form__control"
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

          <div className="bake-log-form__row">
            <div className="bake-log-form__field">
              <label className="bake-log-form__label" htmlFor="bakeDate">
                Bake date
              </label>

              <input
                id="bakeDate"
                className="bake-log-form__control"
                type="date"
                name="bakeDate"
                value={formValues.bakeDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="bake-log-form__field">
              <label className="bake-log-form__label" htmlFor="rating">
                Rating
              </label>

              <select
                id="rating"
                className="bake-log-form__control"
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

          <div className="bake-log-form__field">
            <label className="bake-log-form__label" htmlFor="notes">
              Baking notes
            </label>

            <textarea
              id="notes"
              className="bake-log-form__control bake-log-form__textarea"
              name="notes"
              value={formValues.notes}
              onChange={handleInputChange}
              placeholder="How was the rise, fermentation, crumb, crust, flavor, or overall result?"
              rows="6"
            />
          </div>

          {formError && (
            <p className="bake-log-form__message bake-log-form__message_error">
              {formError}
            </p>
          )}

          {successMessage && (
            <p className="bake-log-form__message bake-log-form__message_success">
              {successMessage}
            </p>
          )}

          <div className="bake-log-form__actions">
            {isEditing && (
              <button
                className="bake-log-form__cancel"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}

            <button className="bake-log-form__submit" type="submit">
              {isEditing ? "Update Bake" : "Save Bake"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default BakeLogForm;
