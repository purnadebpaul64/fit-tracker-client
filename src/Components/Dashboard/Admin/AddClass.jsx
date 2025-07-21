import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Your existing imageUpload helper function
const imageUpload = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );
    return data?.data?.display_url;
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};

const categories = [
  "Yoga",
  "Weightlifting",
  "Cardio",
  "Crossfit",
  "Zumba",
  "Pilates",
];

const AddClass = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    duration: "",
    imageFile: null, // store file here
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.category
    ) {
      toast.error("Please fill in Name, Description and select Category.");
      return;
    }

    if (!formData.imageFile) {
      toast.error("Please select an image file.");
      return;
    }

    setIsSubmitting(true);

    // Upload image to imgbb and get URL
    const uploadedImageUrl = await imageUpload(formData.imageFile);
    if (!uploadedImageUrl) {
      toast.error("Image upload failed. Try again.");
      setIsSubmitting(false);
      return;
    }

    // Prepare class data with image URL
    const classData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      duration: formData.duration,
      image: uploadedImageUrl,
      created_at: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/classes`,
        classData
      );

      if (res.data.insertedId) {
        toast.success("Class added successfully!");
        setFormData({
          name: "",
          description: "",
          category: "",
          duration: "",
          imageFile: null,
        });
        // Reset file input manually if needed
        document.getElementById("imageInput").value = "";
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add class");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-6 border bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          className="input w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Class Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          className="textarea w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Description *"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          rows={4}
        />
        <select
          className="input w-full border border-gray-300 rounded px-3 py-2 bg-white"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Select Category *
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="input w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Duration (e.g., 60 minutes)"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
        />

        {/* File input for image */}
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          className="input w-full border border-gray-300 rounded px-3 py-2"
          onChange={(e) =>
            setFormData({ ...formData, imageFile: e.target.files[0] })
          }
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-indigo-700"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Class"}
        </button>
      </form>
    </div>
  );
};

export default AddClass;
