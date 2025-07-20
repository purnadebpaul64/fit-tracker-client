import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { imageUpload } from "../../../Api/utils";
import { Button } from "@material-tailwind/react";

const BecomeTrainer = () => {
  const { user } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [trainerData, setTrainerData] = useState({
    fullName: "",
    email: user?.email || "",
    age: "",
    experience: "",
    about: "",
    profileImage: "",
    skills: [],
    availableDays: [],
    availableTime: [],
    facebook: "",
    linkedin: "",
    instagram: "",
  });

  const daysOptions = [
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
    { value: "Sat", label: "Saturday" },
  ];

  const timeOptions = [
    { value: "6AM - 8AM", label: "6AM - 8AM" },
    { value: "10AM - 12PM", label: "10AM - 12PM" },
    { value: "2PM - 4PM", label: "2PM - 4PM" },
    { value: "6PM - 8PM", label: "6PM - 8PM" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainerData({ ...trainerData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTrainerData({
        ...trainerData,
        skills: [...trainerData.skills, value],
      });
    } else {
      setTrainerData({
        ...trainerData,
        skills: trainerData.skills.filter((skill) => skill !== value),
      });
    }
  };

  const handleSelectDays = (selected) => {
    const days = selected.map((item) => item.value);
    setTrainerData({ ...trainerData, availableDays: days });
  };

  const handleSelectTime = (selected) => {
    const times = selected.map((item) => item.value);
    setTrainerData({ ...trainerData, availableTime: times });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await imageUpload(imageFile);
      if (!imageUrl) {
        setLoading(false);
        return toast.error("Image upload failed");
      }
    }

    // Build the final object
    const trainerInfo = {
      fullName: trainerData.fullName,
      email: trainerData.email,
      age: trainerData.age,
      about: trainerData.about,
      experience: trainerData.experience,
      profileImage: imageUrl,
      skills: trainerData.skills,
      availableDays: trainerData.availableDays,
      availableTime: trainerData.availableTime,
      social: {
        facebook: trainerData.facebook,
        linkedin: trainerData.linkedin,
        instagram: trainerData.instagram,
      },
      status: "pending",
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-trainers`,
        trainerInfo
      );
      if (res.data.insertedId) {
        toast.success("Trainer Application Submitted!");
        setTrainerData({
          fullName: "",
          email: user?.email || "",
          age: "",
          experience: "",
          about: "",
          skills: [],
          availableDays: [],
          availableTime: [],
          facebook: "",
          linkedin: "",
          instagram: "",
        });
        setImageFile(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-8/12 mx-auto my-20 p-8 border border-white bg-white/90 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6">Become a Trainer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="input input-bordered w-full border border-gray-500 p-2 rounded"
              placeholder="Enter your full name"
              value={trainerData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="input input-bordered w-full border border-gray-500 p-2 rounded"
              value={user?.email}
            />
          </div>
        </div>

        {/* Age and Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Your Age</label>
            <input
              type="number"
              name="age"
              className="input input-bordered w-full border border-gray-500 p-2 rounded"
              placeholder="Age"
              value={trainerData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Years of Experience</label>
            <input
              type="number"
              name="experience"
              className="input input-bordered w-full border border-gray-500 p-2 rounded"
              placeholder="Experience"
              value={trainerData.experience}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* image */}
        <div>
          <label className="block mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full border border-gray-500 p-2 rounded"
          />
        </div>
        {/* about */}
        <div>
          <label className="block mb-1">Write about yourself</label>
          <textarea
            name="about"
            className="w-full border border-gray-500 p-2 rounded"
            placeholder="Write here"
            value={trainerData.about}
            onChange={handleChange}
            required
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block mb-1 font-medium">Select Skills:</label>
          <div className="grid grid-cols-2 gap-2 ">
            {[
              "Yoga",
              "Weightlifting",
              "Cardio",
              "Crossfit",
              "Zumba",
              "Pilates",
            ].map((skill) => (
              <label key={skill} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={skill}
                  checked={trainerData.skills.includes(skill)}
                  onChange={handleSkillsChange}
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Available Days */}
        <div>
          <label className="block mb-1 font-medium">Available Days:</label>
          <Select
            options={daysOptions}
            isMulti
            onChange={handleSelectDays}
            className="text-black"
          />
        </div>

        {/* Available Time */}
        <div>
          <label className="block mb-1 font-medium">Available Time:</label>
          <Select
            options={timeOptions}
            isMulti
            onChange={handleSelectTime}
            className="text-black"
          />
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">Facebook</label>
            <input
              type="url"
              name="facebook"
              className="input input-bordered w-full border p-2 rounded"
              placeholder="Facebook URL"
              value={trainerData.facebook}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              className="input input-bordered w-full border p-2 rounded"
              placeholder="LinkedIn URL"
              value={trainerData.linkedin}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">Instagram</label>
            <input
              type="url"
              name="instagram"
              className="input input-bordered w-full border p-2 rounded"
              placeholder="Instagram URL"
              value={trainerData.instagram}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-16 py-2 mt-4 text-lg"
        >
          {loading ? "Submitting..." : "Apply"}
        </Button>
      </form>
    </div>
  );
};

export default BecomeTrainer;
