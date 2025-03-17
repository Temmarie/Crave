import React from 'react';
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-darkAccent text-2xl font-bold">Your Profile</h2>
      {user ? (
        <div>
          <p className="text-gray-700">Email: {user.email}</p>
          <p className="text-gray-700">Display Name: {user.displayName || "Not set"}</p>
          <img src={user.photoURL || "https://placehold.co/600x400/C6D2FF/615FFF.png"} alt="Profile" className="w-24 h-24 rounded-full" />
          <Link to="/profile" className="mt-2 bg-blue-300 text-white p-2 rounded">Edit Profile</Link>
          <button onClick={logout} className="mt-4 bg-red-400 text-white p-2 rounded">Logout</button>
        </div>
      ) : (
        <p className="text-gray-700">Please log in to see your profile.</p>
      )}
    </div>
  );
};

export default Dashboard;
