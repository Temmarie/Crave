import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebase.js';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const AiRecipe = () => {
  const [ingredients, setIngredients] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "aiRecipes")); // Fetch from the `recipes` collection
        const recipes = querySnapshot.docs.map((doc) => doc.data());
        console.log(recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const generateRecipe = async () => {
    setLoading(true);
    const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
    console.log("OpenAI API Key:", openaiApiKey); // Debugging: Check if the API key is loaded
  
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `Generate a recipe using: ${ingredients}`,
          max_tokens: 150,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.choices && data.choices.length > 0) {
        setGeneratedRecipe(data.choices[0].text);
  
        // Save AI recipe to Firestore
        await addDoc(collection(db, "aiRecipes"), {
          ingredients,
          recipe: data.choices[0].text,
          createdBy: user ? user.uid : "anonymous", // Save user ID if available
          createdAt: new Date(),
        });
      } else {
        alert("Failed to generate a recipe. Please try again.");
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      alert("An error occurred while generating the recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">AI Recipe Generator</h1>
      <div className="space-y-4">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (e.g., chicken, rice, garlic)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={generateRecipe}
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </button>
      </div>
      {generatedRecipe && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Generated Recipe:</h2>
          <p className="text-gray-700 whitespace-pre-line">{generatedRecipe}</p>
        </div>
      )}
    </div>
  );
};

export default AiRecipe;