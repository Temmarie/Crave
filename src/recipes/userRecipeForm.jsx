
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // Custom hook for auth
import { useNavigate } from "react-router-dom";

const   AddUserRecipe = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    cookingTime: 0,
    servings: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to add a recipe.");
    try {
      await addDoc(collection(db, `users/${user.uid}/userRecipes`), {
        ...recipe,
        createdBy: user.uid, // Add the createdBy field
      });
      alert("Recipe added successfully!");
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe. Please try again.");
    }
  };

  return (
<form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Add Your Recipe</h2>

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
        value={recipe.cookingTime}
        onChange={(e) =>
          setRecipe({ ...recipe, cookingTime: e.target.valueAsNumber })
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
        Add Recipe
      </button>

      <div className="text-center mt-4">
        <a
          href="/user-recipes"
          className="text-blue-500 hover:underline"
        >
          View Your Recipes
        </a>
      </div>
    </form>
  );
};

export default AddUserRecipe;
