import { fetchRecipesFromAPI } from "../services/firestore";

fetchRecipesFromAPI().then(() => {
  console.log("Recipes have been successfully added to Firestore!");
});