import { useState } from "react";
import { signUpWithEmail, auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmail(email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-indigo-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-blue-900 text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-indigo-500">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-indigo-500 text-white p-2 rounded uppercase font-bold" type="submit">
            Sign Up
          </button>
        </form>
        <hr className="my-4" />
        <button onClick={signInWithGoogle} className="w-full bg-black text-white p-2 rounded">
          Sign Up with Google
        </button>
        <p className="mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-indigo-500 uppercase">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
