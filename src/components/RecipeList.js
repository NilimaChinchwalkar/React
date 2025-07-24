import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const RecipeList = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem("recipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;

    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  const handleEdit = (id) => {
    navigate(`/edit-recipe/${id}`);
  };

  return (
    <div className="container my-2">
      <div className="row mb-3">
        <div className="col">
          <h2 className="mb-0">Recipe List</h2>
        </div>
        <div className="col-auto">
          <Link to="/add-recipe" className="btn btn-primary">
            + Add Recipe
          </Link>
        </div>
      </div>
      <div className="card p-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Preparation Time (in min)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <tr key={recipe.id}>
                  <td>{index + 1}</td>
                  <td>{recipe.title}</td>
                  <td>{recipe.category}</td>
                  <td>{recipe.prepTime}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(recipe.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No recipes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipeList;
