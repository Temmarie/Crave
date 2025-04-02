import { db } from "../firebase";
import { collection, addDoc, getDocs,  query, where  } from "firebase/firestore";

 const addRecipe = async (recipeData) => {
  try {
    const docRef = await addDoc(collection(db, "recipes"), recipeData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding recipe:", error);
  }
};


 const getRecipes = async () => {
  const querySnapshot = await getDocs(collection(db, "recipes"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

 const saveFavorite = async (userId, recipeId) => {
    try {
      await addDoc(collection(db, "faves"), { userId, recipeId });
    } catch (error) {
      console.error("Error saving favorite:", error);
    }
  };

  const getUserFavorites = async (userId) => {
    const q = query(collection(db, "favorites"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data().recipeId);
  };

  

// Function to fetch recipes from the Spoonacular API and populate Firestore
const fetchRecipesFromAPI = async () => {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Helper function to add delay

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100`
    );
    const data = await response.json();

    for (const recipe of data.results) {
      const recipeInfoResponse = await fetch(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}&includeNutrition=false`
      );
      const recipeInfoData = await recipeInfoResponse.json();

      // Map ingredients to a Firestore-compatible structure
      const ingredients = recipeInfoData.extendedIngredients
        ? recipeInfoData.extendedIngredients.map((ingredient) => ({
            name: ingredient.name,
            amount: `${ingredient.amount} ${ingredient.unit}`,
          }))
        : [];

      // Add the recipe to Firestore
      await addDoc(collection(db, "recipes"), {
        title: recipeInfoData.title,
        description: recipeInfoData.summary,
        imageUrl: recipeInfoData.image,
        ingredients: ingredients,
        instructions: recipeInfoData.analyzedInstructions[0]?.steps.map((step) => step.step) || [],
        cookTime: recipeInfoData.readyInMinutes || null,
        prepTime: recipeInfoData.preparationMinutes || null,
        servings: recipeInfoData.servings || null,
        tags: recipeInfoData.cuisines || [],
        createdBy: "/users/USER_ID", // Replace USER_ID with the actual user ID if available
      });

      // Add a delay of 1 second between requests to avoid hitting the API rate limit
      await sleep(1000);
    }
  } catch (error) {
    console.error("Error fetching recipes from API:", error);
  }
};

// add user recipe to firestore
const addUserRecipe = async (userId, recipeData) => {
  try {
    const docRef = await addDoc(collection(db, `users/${userId}/userRecipes`), recipeData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding user recipe:", error);
  }
};



// ai recipe generator

// const aiRecipeGenerator = () => {
//   const [ingredients, setIngredients] = useState("");
//   const [generatedRecipe, setGeneratedRecipe] = useState(null);
//   const { user } = useAuth();

//   const generateRecipe = async () => {
//     const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

//     try {
//       const response = await fetch("https://api.openai.com/v1/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${openaiApiKey}`,
//         },
//         body: JSON.stringify({
//           model: "text-davinci-003",
//           prompt: `Generate a recipe using: ${ingredients}`,
//           max_tokens: 150,
//         }),
//       });

//       const data = await response.json();

//       if (data.choices && data.choices.length > 0) {
//         setGeneratedRecipe(data.choices[0].text);

//         // Save AI recipe to Firestore
//         if (user) {
//           await addDoc(collection(db, "aiRecipes"), {
//             ingredients,
//             recipe: data.choices[0].text,
//             createdBy: user.uid,
//             createdAt: new Date(),
//           });
//         }
//       } else {
//         alert("Failed to generate a recipe. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error generating recipe:", error);
//       alert("An error occurred while generating the recipe. Please try again.");
//     }
//   };

//   return { generateRecipe, generatedRecipe, setIngredients };
// };

export { addRecipe, getRecipes, saveFavorite, getUserFavorites, fetchRecipesFromAPI, addUserRecipe, aiRecipeGenerator };