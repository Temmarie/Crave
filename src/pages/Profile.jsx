import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const Profile = () => {
  const { user, logout } = useAuth();
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || "");
  const [message, setMessage] = useState("");

  const handleUpdateName = async () => {
    if (newDisplayName.trim() === "") {
      setMessage("Display name cannot be empty.");
      return;
    }
    try {
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-darkAccent text-2xl font-bold">Edit Profile</h2>
      {user ? (
        <div>
          <p className="text-gray-700">Email: {user.email}</p>
          <p className="text-gray-700">User name: {user.displayName || "Not set"}</p>
          <div className="mt-4">
            <input type="text" value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)} className="p-2 border rounded w-full" />
            <button onClick={handleUpdateName} className="mt-2 bg-green-300 text-white p-2 rounded">Update Name</button>
            {message && <p className="mt-2 text-gray-600">{message}</p>}
          </div>
          <button onClick={logout} className="mt-4 bg-red-400 text-white p-2 rounded">Logout</button>
        </div>
      ) : (
        <p className="text-gray-700">Please log in to edit your profile.</p>
      )}
    </div>
  );
};

export default Profile;
