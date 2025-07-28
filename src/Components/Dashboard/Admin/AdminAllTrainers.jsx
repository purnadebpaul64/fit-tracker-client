import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const AdminAllTrainers = () => {
  const { user } = useAuth();
  const token = user?.accessToken;
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch trainers
  const fetchTrainers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/approved-trainers`
      );
      setTrainers(res.data); // assumes backend only returns approved trainers
    } catch (err) {
      setError("Failed to fetch trainers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // Handle delete trainer (revert role to member) with SweetAlert2 confirmation
  const handleDeleteTrainer = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this trainer and revert role to member?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove!",
    });

    if (result.isConfirmed) {
      setDeletingId(id);
      try {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/revert-trainer-role/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire("Removed!", "Trainer role reverted to member.", "success");
        fetchTrainers();
      } catch (err) {
        Swal.fire("Error", "Failed to remove trainer.", "error");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Approved Trainers</h1>

      {loading && <p>Loading trainers...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && trainers.length === 0 && (
        <p>No approved trainers found.</p>
      )}

      {!loading && !error && trainers.length > 0 && (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Profile Image</th>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Experience (Years)</th>
              <th className="py-2 px-4 border-b">Skills</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  <img
                    src={trainer.profileImage}
                    alt={trainer.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b">{trainer.fullName}</td>
                <td className="py-2 px-4 border-b">{trainer.email}</td>
                <td className="py-2 px-4 border-b">{trainer.experience}</td>
                <td className="py-2 px-4 border-b">
                  {trainer.skills?.join(", ")}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    disabled={deletingId === trainer._id}
                    onClick={() => handleDeleteTrainer(trainer._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    {deletingId === trainer._id
                      ? "Removing..."
                      : "Remove Trainer"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminAllTrainers;
