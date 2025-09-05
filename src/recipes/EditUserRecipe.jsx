import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const EditUserRecipe = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    cookingTime: 0,
    prepTime: 0,
    servings: 0,
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeRef = doc(db, `users/${user.uid}/userRecipes`, id);
        const recipeSnap = await getDoc(recipeRef);

        if (recipeSnap.exists()) {
          setRecipe(recipeSnap.data());
        } else {
          alert("Recipe not found!");
          navigate("/user-recipes");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        alert("Failed to fetch recipe. Please try again.");
      }
    };

    if (user) {
      fetchRecipe();
    }
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recipeRef = doc(db, `users/${user.uid}/userRecipes`, id);
      await updateDoc(recipeRef, recipe);
      alert("Recipe updated successfully!");
      navigate("/user-recipes");
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe. Please try again.");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Edit Recipe</h2>

      <input
        type="text"
        placeholder="Title"
        value={recipe.title}
        onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Description"
        value={recipe.description}
        onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Ingredients (separate by commas)"
        value={recipe.ingredients}
        onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Instructions (step-by-step)"
        value={recipe.instructions}
        onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Cooking Time (minutes)"
        value={recipe.cookTime}
        onChange={(e) =>
          setRecipe({ ...recipe, cookTime: e.target.valueAsNumber })
        }
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Preparation Time (minutes)"
        value={recipe.prepTime}
        onChange={(e) =>
          setRecipe({ ...recipe, prepTime: e.target.valueAsNumber })
        }
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Servings"
        value={recipe.servings}
        onChange={(e) =>
          setRecipe({ ...recipe, servings: e.target.valueAsNumber })
        }
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Update Recipe
      </button>
    </form>
  );
};

export default EditUserRecipe;
