import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";

const ActivityLog = () => {
  const { user } = useAuth();
  const token = user?.accessToken;
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/member-applications/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApplications(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user?.email) fetchData();
  }, [user]);

  if (applications.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <h2 className="text-xl font-semibold">Trainer Application Status</h2>
        <p>No pending or rejected trainer applications found.</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <Helmet>
        <title>Your Activity</title>
      </Helmet>
      <h2 className="text-xl font-bold mb-4">Trainer Application Status</h2>
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded"
          >
            <div>
              <h3 className="font-medium">{app.fullName}</h3>
              <p>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    app.status === "rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {app.status}
                </span>
              </p>
            </div>
            {app.status === "rejected" && (
              <button
                onClick={() => {
                  setSelectedApp(app);
                  setOpen(true);
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <Eye />
              </button>
            )}
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-3xl font-semibold text-center mb-4">
              Rejection Feedback
            </h3>
            <p className="text-center text-gray-700 text-lg">
              {selectedApp?.feedback || "No feedback provided."}
            </p>
            <div className="mt-6 flex justify-center">
              <Button
                className="bg-red-500 text-white"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
