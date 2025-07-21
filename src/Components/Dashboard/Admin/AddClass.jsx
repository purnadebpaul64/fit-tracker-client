import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddClass = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    duration: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newClass = {
      ...formData,
      created_at: new Date().toISOString(),
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/classes`,
        newClass
      );
      if (res.data.insertedId) {
        toast.success("Class added successfully!");
        setFormData({
          name: "",
          description: "",
          category: "",
          duration: "",
          image: "",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add class");
    }
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-6 border bg-white rounded">
      <h2 className="text-2xl font-semibold mb-4">Add New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input w-full"
          placeholder="Class Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          className="textarea w-full"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <input
          className="input w-full"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
        <input
          className="input w-full"
          placeholder="Duration"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
        />
        <input
          className="input w-full"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-2 rounded"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
