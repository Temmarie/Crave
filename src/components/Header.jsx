import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();


  return (
    <nav className="bg-indigo-200 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold uppercase">Recipe</h1>
      {user ? (
        <div className="flex items-center space-x-4">
          <p className="text-indigo-600 uppercase italic font-bold">{user.displayName}</p>
          <button onClick={logout} className="bg-gray-200 text-blue-900 font-bold uppercase  px-4 py-2 rounded">
            Logout
          </button>
        </div>
      ) : (
        <button className="bg-indigo-500 text-white px-4 py-2 rounded uppercase font-bold">
          Sign In
        </button>
      )}
    </nav>
  );
};

export default Header;
