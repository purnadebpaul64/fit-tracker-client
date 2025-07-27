import { useEffect, useRef, useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import useAuth from "../../Hooks/useAuth";
import { imageUpload } from "../../Api/utils";

const ProfileUpdate = () => {
  const { user, updateUser } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef(null); // ✅ create a ref

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Updating...");
    try {
      let uploadedPhotoURL = photoURL;

      if (imageFile) {
        const uploadedURL = await imageUpload(imageFile);
        if (uploadedURL) {
          uploadedPhotoURL = uploadedURL;
        } else {
          setMessage("Image upload failed. Try again.");
          return;
        }
      }

      await updateUser({
        displayName,
        photoURL: uploadedPhotoURL,
      });

      setPhotoURL(uploadedPhotoURL);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage("Something went wrong.");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // ✅ trigger file input
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPhotoURL(URL.createObjectURL(file)); // Preview before upload
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-25 mb-15 bg-white/10 p-6 border border-white/20 shadow-md rounded-xl text-white">
      <Typography
        variant="h4"
        color="blue-gray"
        className="text-center mb-6 text-white"
      >
        Update Profile
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label>Display Name</label>
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="rounded"
        />

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        <Button type="submit" fullWidth>
          Save Changes
        </Button>
      </form>

      {message && (
        <Typography
          variant="small"
          className="mt-4 text-center"
          color={message.includes("success") ? "green" : "red"}
        >
          {message}
        </Typography>
      )}

      {/* Preview and clickable image */}
      {user && (
        <div className="mt-8 text-center">
          <img
            onClick={handleImageClick}
            src={photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-white cursor-pointer hover:scale-105 transition-transform"
            title="Click to change photo"
          />
          <Typography className="mt-2 font-semibold text-white">
            {displayName || "No Name"}
          </Typography>
          <Typography variant="small" className="text-gray-300">
            {user.email}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ProfileUpdate;
