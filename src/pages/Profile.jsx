import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { uploadImageToCloudinary } from "../cloudinary";

const Profile = () => {
  const { user, logout } = useAuth();
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || "");
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleUpdateProfile = async () => {
    try {
      let photoURL = user.photoURL || "https://placehold.co/600x400/C6D2FF/615FFF.png";

      if (newImage) {
        photoURL = await uploadImageToCloudinary(newImage);
      }

      await updateProfile(auth.currentUser, { displayName: newDisplayName, photoURL });
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
          
          <img src={user.photoURL || "https://placehold.co/600x400/C6D2FF/615FFF.png"} alt="Profile" className="w-24 h-24 rounded-full" />
          
          <input type="file" onChange={handleImageChange} className="mt-2 mb-4 bg-indigo-200 text-white p-3 font-bold" />
          
          <input type="text" value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)} className="p-2 border rounded w-full" />
          
          <button onClick={handleUpdateProfile} className="mt-2 bg-green-300 text-white p-2 rounded">Update Profile</button>
          
          {message && <p className="mt-2 text-gray-600">{message}</p>}
          
          <button onClick={logout} className="mt-4 bg-red-400 text-white p-2 rounded">Logout</button>
        </div>
      ) : (
        <p className="text-gray-700">Please log in to edit your profile.</p>
      )}
    </div>
  );
};

export default Profile;
