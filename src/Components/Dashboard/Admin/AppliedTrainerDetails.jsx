import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const AppliedTrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = user?.accessToken;
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTrainer = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/applied-trainers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrainer(res.data);
      setFeedback(res.data.feedback || "");
    } catch (err) {
      setError("Failed to fetch trainer details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainer();
  }, [id]);

  // ✅ Approve with SweetAlert confirmation
  const handleApprove = async () => {
    const result = await Swal.fire({
      title: "Approve Trainer?",
      text: "This action will approve the trainer application.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/approve-trainer/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire("Approved!", "Trainer has been approved.", "success");
        navigate("/admin/applied-trainers");
      } catch (err) {
        Swal.fire("Error", "Failed to approve trainer.", "error");
      }
    }
  };

  // Reject with feedback validation
  const handleReject = async () => {
    if (feedback.trim() === "") {
      Swal.fire(
        "Feedback Required",
        "Please provide rejection feedback.",
        "warning"
      );
      return;
    }

    setSubmitting(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/reject-trainer/${id}`,
        {
          feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRejectModalOpen(false);
      Swal.fire(
        "Rejected",
        "Trainer has been rejected with feedback.",
        "success"
      );
      navigate("/admin/applied-trainers");
    } catch (err) {
      Swal.fire("Error", "Failed to reject trainer.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!trainer) return null;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Trainer Application Details</h1>

      <div className="mb-6 border rounded p-4 bg-gray-50">
        <p>
          <strong>Full Name:</strong> {trainer.fullName}
        </p>
        <p>
          <strong>Email:</strong> {trainer.email}
        </p>
        <p>
          <strong>Age:</strong> {trainer.age}
        </p>
        <p>
          <strong>Skills:</strong> {trainer.skills?.join(", ")}
        </p>
        <p>
          <strong>Status:</strong> {trainer.status}
        </p>
        <p>
          <strong>Profile Image:</strong>
        </p>
        <img
          src={trainer.profileImage}
          alt={trainer.fullName}
          className="w-32 h-32 rounded object-cover mb-4"
        />
        <p>
          <strong>Available Days:</strong> {trainer.availableDays?.join(", ")}
        </p>
        <p>
          <strong>Available Time:</strong> {trainer.availableTime}
        </p>
        <p>
          <strong>Additional Details:</strong> {trainer.details || "N/A"}
        </p>
        {trainer.feedback && (
          <p className="mt-2 text-red-600">
            <strong>Rejection Feedback:</strong> {trainer.feedback}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleApprove}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
        >
          Approve
        </button>

        <button
          onClick={() => setRejectModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
        >
          Reject
        </button>
      </div>

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Reject Trainer Application
            </h2>

            <p>
              <strong>Applicant:</strong> {trainer.fullName} ({trainer.email})
            </p>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter rejection feedback here..."
              rows={5}
              className="w-full border border-gray-300 rounded p-2 mt-2 mb-4 resize-none"
            ></textarea>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                disabled={submitting}
              >
                Cancel
              </button>

              <button
                onClick={handleReject}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedTrainerDetails;
