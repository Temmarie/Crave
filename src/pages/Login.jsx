import { useState } from "react";
import { signInWithEmail, auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-indigo-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-blue-900 text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-indigo-500">{error}</p>}
        <form onSubmit={handleLogin}>
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
            Login
        </button>
        </form>
        <hr className="my-4" />
        <button onClick={signInWithGoogle} className="w-full bg-black text-white p-2 rounded">
          Login with Google
        </button>
        <p className="mt-4 text-gray-600">
          Don't have an account? <a href="/signup" className="text-indigo-500 uppercase">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
