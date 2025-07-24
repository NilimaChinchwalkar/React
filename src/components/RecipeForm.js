import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const { id } = useParams(); // Get recipe ID from URL if editing
  const navigate = useNavigate();

  const isEditMode = Boolean(id); // True if editing

  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    image: null,
    prepTime: "",
    category: "",
  });

  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const existingRecipe = storedRecipes.find((r) => r.id === Number(id));

      if (existingRecipe) {
        setFormData({
          ...existingRecipe,
          image: existingRecipe.image, // Reset image so user can choose new if desired
        });
      } else {
        setAlertMessage("Recipe not found.");
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

      let base64Image = null;
      if (formData.image && typeof formData.image !== "string") {
        base64Image = await toBase64(formData.image);
      }
      let updatedRecipes;
      if (isEditMode) {
        updatedRecipes = storedRecipes.map((recipe) =>
          recipe.id === Number(id)
            ? {
                ...recipe,
                ...formData,
                id: Number(id),
                image: formData.image || recipe.image,
              }
            : recipe
        );

        setAlertMessage("✅ Recipe updated successfully!");
      } else {
        const newRecipe = {
          id: Date.now(),
          ...formData,
        };

        updatedRecipes = [...storedRecipes, newRecipe];
        setAlertMessage("✅ Recipe added successfully!");
      }

      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

      setTimeout(() => {
        setAlertMessage("");
        navigate("/recipe"); // redirect to list
      }, 2000);

      if (!isEditMode) {
        setFormData({
          title: "",
          category: "",
          prepTime: "",
          ingredients: "",
          steps: "",
          image: null,
        });
      }
    } catch (err) {
      console.error("Error saving recipe:", err);
      setAlertMessage("❌ Failed to save recipe.");
      setTimeout(() => setAlertMessage(""), 3000);
    }
  };

  return (
    <div className="container my-2">
      <h2 className="mb-4">{isEditMode ? "Edit Recipe" : "Add Recipe"}</h2>

      {alertMessage && (
        <div className="alert alert-success mt-2" role="alert">
          {alertMessage}
        </div>
      )}

      <div className="card p-4">
        <form onSubmit={handleSubmit}>
          <div className="col-md-8 mb-3">
            <label htmlFor="title" className="form-label">
              Recipe Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-md-4">
              <label htmlFor="image" className="form-label">
                Choose Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              {formData.image && (
                <div className="border rounded p-2 text-center">
                  <img
                    src={
                      typeof formData.image === "string"
                        ? formData.image // base64 string
                        : formData.image instanceof File
                        ? URL.createObjectURL(formData.image)
                        : "" // fallback
                    }
                    alt="Recipe Preview"
                    className="img-fluid rounded"
                    style={{ maxHeight: "150px", objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="col-md-8 mb-3">
            <label htmlFor="ingredients" className="form-label">
              Ingredients
            </label>
            <textarea
              className="form-control"
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>

          <div className="col-md-8 mb-3">
            <label htmlFor="steps" className="form-label">
              Steps
            </label>
            <textarea
              className="form-control"
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>

          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="prepTime" className="form-label">
                Preparation Time (in min)
              </label>
              <input
                type="number"
                className="form-control"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            {isEditMode ? "Update Recipe" : "Submit Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
