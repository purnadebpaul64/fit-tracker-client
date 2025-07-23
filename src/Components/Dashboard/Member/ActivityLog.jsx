import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import { Eye } from "lucide-react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

const ActivityLog = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/member-applications?email=${
            user.email
          }`
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
              >
                <Eye />
              </button>
            )}
          </div>
        ))}
      </div>

      <Dialog open={open} handler={() => setOpen(false)}>
        <DialogHeader>Rejection Feedback</DialogHeader>
        <DialogBody>
          <p>{selectedApp?.rejectionMessage || "No feedback provided."}</p>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default ActivityLog;
