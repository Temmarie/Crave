import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import Login from "../src/pages/Login";
import Home from "../src/pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import './App.css'

function App() {

  return (

    <>

      <Router>
      <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  

  )
}

export default App
