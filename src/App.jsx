import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login";
import Home from "../src/pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"
import AddUserRecipe from './recipes/userRecipeForm';
import UserRecipes from './recipes/userRecipes';

import './App.css'
// import { fetchRecipesFromAPI } from "./services/firestore";
// import { useEffect } from "react";

function App() {

  
// useEffect(() => {
//   fetchRecipesFromAPI().then(() => {
//     console.log("Recipes have been successfully added to Firestore!");
//   });
// }, []);

  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-recipes" element={<UserRecipes />} />
          <Route path="/add-recipe" element={<AddUserRecipe />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
