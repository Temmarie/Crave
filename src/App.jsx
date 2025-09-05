import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AddUserRecipe from "./recipes/userRecipeForm";
import UserRecipes from "./recipes/userRecipes";
import EditUserRecipe from "./recipes/EditUserRecipe";
import AiRecipe from "./recipes/aiRecipe";
import ApiRecipe from "./recipes/apiRecipes";
import RecipeView from "./recipes/RecipeView";
import { ProtectedRoute, AuthenticatedRoute } from "./routes/ProtectedRoutes";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Public Routes */}
        <Route element={<AuthenticatedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user-recipes" element={<UserRecipes />} />
          <Route path="/add-recipe" element={<AddUserRecipe />} />
          <Route path="/edit-recipe/:id" element={<EditUserRecipe />} />
          <Route path="/ai-recipe" element={<AiRecipe />} />
          <Route path="/favorites" element={<UserRecipes />} />
          <Route path="/recipes" element={<ApiRecipe />} />
          <Route path="/recipe/:id" element={<RecipeView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
