import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const AppliedTrainersList = () => {
  const { user } = useAuth();
  const token = user?.accessToken;
  const [appliedTrainers, setAppliedTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAppliedTrainers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/applied-trainers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppliedTrainers(res.data);
    } catch (err) {
      setError("Failed to fetch applied trainers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedTrainers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Applied Trainers</h1>

      {loading && <p>Loading applications...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && appliedTrainers.length === 0 && (
        <p>No trainer applications found.</p>
      )}

      {!loading && !error && appliedTrainers.length > 0 && (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appliedTrainers.map((trainer) => (
              <tr key={trainer._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{trainer.fullName}</td>
                <td className="py-2 px-4 border-b">{trainer.email}</td>
                <td className="py-2 px-4 border-b capitalize">
                  {trainer.status}
                </td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/dashboard/applied-trainers/${trainer._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppliedTrainersList;
