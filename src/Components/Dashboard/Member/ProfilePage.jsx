import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { imageUpload } from "../../../Api/utils";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [imageFile, setImageFile] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);

  // Sync local state when user changes (e.g., login or reload)
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  // Handle profile update
  const handleUpdate = async () => {
    try {
      let newPhotoURL = photoURL;

      // Upload new image if selected
      if (imageFile) {
        const uploadedUrl = await imageUpload(imageFile);
        if (uploadedUrl) newPhotoURL = uploadedUrl;
      }

      // Update Firebase user profile
      await updateUser({
        displayName: name,
        photoURL: newPhotoURL,
      });

      toast.success("Profile updated successfully!");
      setPhotoURL(newPhotoURL);
      setShowImageUpload(false);
      setImageFile(null);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile.");
    }
  };

  // Show a message if not logged in
  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-lg text-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center">Your Profile</h2>

      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          src={photoURL || "/default-profile.png"} // fallback image if no photoURL
          alt="Profile"
          className="w-32 h-32 rounded-full cursor-pointer object-cover"
          onClick={() => setShowImageUpload((prev) => !prev)}
          title="Click to change profile image"
        />
      </div>

      {/* Image upload input */}
      {showImageUpload && (
        <div className="text-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="mt-2"
          />
        </div>
      )}

      {/* Name input */}
      <div>
        <label className="block mb-1 font-semibold">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Enter your name"
        />
      </div>

      {/* Email (read-only) */}
      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="text"
          value={user.email}
          readOnly
          className="w-full px-4 py-2 border bg-gray-100 rounded-lg cursor-not-allowed"
        />
      </div>

      {/* Last login time */}
      <div>
        <label className="block mb-1 font-semibold">Last Login</label>
        <input
          type="text"
          value={user.metadata?.lastSignInTime || ""}
          readOnly
          className="w-full px-4 py-2 border bg-gray-100 rounded-lg cursor-not-allowed"
        />
      </div>

      {/* Update button */}
      <div className="text-center">
        <button
          onClick={handleUpdate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
