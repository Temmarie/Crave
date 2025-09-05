import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const RecipeView = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeRef = doc(db, "recipes", id); // Fetch the recipe by ID
        const recipeSnap = await getDoc(recipeRef);

        if (recipeSnap.exists()) {
          setRecipe(recipeSnap.data());
        } else {
          alert("Recipe not found!");
          navigate("/recipes"); // Redirect to the recipes list if not found
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        alert("Failed to fetch recipe. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading recipe...</p>;
  }

  if (!recipe) {
    return <p className="text-center text-gray-500">Recipe not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">{recipe.title}</h1>
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-700 mb-4">
        {recipe.description?.replace(/<[^>]+>/g, "")}
      </p>
      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>Cooking Time:</strong> {recipe.cookTime || "N/A"} minutes
        </p>
        <p>
          <strong>Preparation Time:</strong> {recipe.prepTime || "N/A"} minutes
        </p>
        <p>
          <strong>Servings:</strong> {recipe.servings || "N/A"}
        </p>
        <p>
          <strong>Ingredients:</strong>
        </p>
        <ul className="list-disc list-inside">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name} - {ingredient.amount}
            </li>
          ))}
        </ul>
        <p>
          <strong>Instructions:</strong>
        </p>
        <ol className="list-decimal list-inside">
          {recipe.instructions?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
      <button
        onClick={() => navigate("/recipes")}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Back to Recipes
      </button>
    </div>
  );
};

export default RecipeView;
