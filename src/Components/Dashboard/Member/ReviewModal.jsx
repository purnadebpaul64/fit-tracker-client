import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

const ReviewModal = ({ booking, onClose }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const { user } = useAuth();

  const handleSubmit = async () => {
    try {
      const reviewData = {
        trainerId: booking.trainerId,
        trainerName: booking.trainer?.fullName,
        userEmail: booking.userEmail,
        userName: user?.displayName,
        userImage: user?.photoURL,
        rating,
        text,
        createdAt: new Date(),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, reviewData);
      toast.success("Review submitted!");
      onClose();
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Leave a Review</h2>

        <textarea
          className="w-full border p-2 rounded mb-3"
          rows="4"
          placeholder="Your feedback..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label className="block mb-2">Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
