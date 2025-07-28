import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const AddSlot = () => {
  const { user } = useAuth();
  const token = user?.accessToken;
  const [trainer, setTrainer] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [slotName, setSlotName] = useState("");
  const [slotTime, setSlotTime] = useState("");

  // Fetch trainer data
  useEffect(() => {
    const fetchTrainer = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/trainers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const matched = res.data.find((t) => t.email === user?.email);
      setTrainer(matched);
    };
    fetchTrainer();
  }, [user]);

  // Fetch all classes
  useEffect(() => {
    const fetchClasses = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-classes`
      );
      setClasses(res.data);
    };
    fetchClasses();
  }, []);

  const handleAddSlot = async (e) => {
    e.preventDefault();
    if (!selectedDays.length || !selectedClass || !slotName || !slotTime) {
      return toast.error("Please fill out all required fields.");
    }

    const slotData = {
      trainerId: trainer._id,
      trainerEmail: trainer.email,
      trainerName: trainer.fullName,
      slotName,
      slotTime,
      availableDays: selectedDays.map((d) => d.value),
      classId: selectedClass.value,
      className: selectedClass.label,
      created_at: new Date().toISOString(),
      bookedBy: null,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-slot`,
        slotData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.insertedId) {
        toast.success("Slot added successfully!");
        setSlotName("");
        setSlotTime("");
        setSelectedDays([]);
        setSelectedClass(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add slot");
    }
  };

  const dayOptions =
    trainer?.availableDays?.map((day) => ({
      value: day,
      label: day,
    })) || [];

  const classOptions = classes.map((c) => ({
    value: c._id,
    label: c.name,
  }));

  return (
    <section className="w-11/12 sm:w-8/12 mx-auto my-12 p-8 bg-white border rounded-xl">
      <Helmet>
        <title>Add New Slot</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-6">Add New Slot</h2>

      {trainer ? (
        <form onSubmit={handleAddSlot} className="space-y-5">
          {/* Read-only trainer info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              readOnly
              value={trainer.fullName}
              className="input p-2 border border-gray-300 rounded"
            />
            <input
              readOnly
              value={trainer.email}
              className="input p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Slot Name & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Slote Name</label>
              <input
                type="text"
                className="input input-bordered w-full p-2 border border-gray-300 rounded"
                placeholder="Slot Name (e.g. Morning Slot)"
                value={slotName}
                onChange={(e) => setSlotName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Slot Time</label>
              <input
                type="text"
                className="input input-bordered w-full p-2 border border-gray-300 rounded"
                placeholder="Slot Time (e.g. 6AM - 8AM)"
                value={slotTime}
                onChange={(e) => setSlotTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Available Days */}
          <div>
            <label className="block mb-1 font-medium">Available Days</label>
            <Select
              options={dayOptions}
              isMulti
              value={selectedDays}
              onChange={setSelectedDays}
              className="text-black"
            />
          </div>

          {/* Select Class */}
          <div>
            <label className="block mb-1 font-medium">Select Class</label>
            <Select
              options={classOptions}
              value={selectedClass}
              onChange={setSelectedClass}
              className="text-black"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-10 py-2 text-white font-medium rounded"
          >
            Add Slot
          </button>
        </form>
      ) : (
        <p>Loading trainer data...</p>
      )}
    </section>
  );
};

export default AddSlot;
