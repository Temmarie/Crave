import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserRecipes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!user) return;
      const q = query(collection(db, `users/${user.uid}/userRecipes`));
      const querySnapshot = await getDocs(q);
      const recipesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipesData);
    };
    fetchRecipes();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Your Recipes</h1>
        <button
          onClick={() => navigate("/add-recipe")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add New Recipe
        </button>
      </div>
      {recipes.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't added any recipes yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-700 mb-4">{recipe.description}</p>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Cooking Time:</strong> {recipe.cookTime} minutes
                </p>
                <p>
                  <strong>Prep Time:</strong> {recipe.prepTime} minutes
                </p>
                <p>
                  <strong>Servings:</strong> {recipe.servings}
                </p>
                <p>
                  <strong>Ingredients:</strong> {recipe.ingredients}
                </p>
                <p>
                  <strong>Instructions:</strong> {recipe.instructions}
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Edit Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRecipes;
