import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const ManageSlots = () => {
  const { user } = useAuth();
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSlots = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/slots-by-email/${user.email}`
      );
      setSlots(res.data);
    } catch (err) {
      toast.error("Failed to fetch slots");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`);
      const allBookings = res.data;

      const slotIds = new Set(slots.map((slot) => slot._id));
      const matched = allBookings.filter((booking) =>
        slotIds.has(booking.slotId)
      );
      setBookings(matched);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadSlots = async () => {
      await fetchSlots();
    };
    loadSlots();
  }, [user.email]);

  useEffect(() => {
    if (slots.length > 0) {
      fetchBookings();
    }
  }, [slots]);

  const handleDelete = (slotId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This slot will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/slots/${slotId}`);
          toast.success("Slot deleted successfully");
          setSlots((prev) => prev.filter((slot) => slot._id !== slotId));
        } catch (error) {
          toast.error("Failed to delete slot");
        }
      }
    });
  };

  if (isLoading) return <div>Loading slots...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Slots</h2>

      {slots.length === 0 ? (
        <p>No slots found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Slot Name</th>
                <th className="p-2 border">Day</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Class</th>
                <th className="p-2 border">Booking</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => {
                const booking = bookings.find((b) => b.slotId === slot._id);

                return (
                  <tr key={slot._id} className="text-center">
                    <td className="p-2 border">{slot.slotName}</td>
                    <td className="p-2 border">
                      {slot.availableDays.map((day, i) => (
                        <p key={i}>{day}</p>
                      ))}
                    </td>
                    <td className="p-2 border">{slot.slotTime}</td>
                    <td className="p-2 border">{slot.className || "N/A"}</td>
                    <td className="p-2 border">
                      {booking ? (
                        <>
                          <p>
                            <strong>Booked By:</strong> {booking.userName}
                          </p>
                          <p>
                            <strong>Email:</strong> {booking.userEmail}
                          </p>
                        </>
                      ) : (
                        "Not Booked"
                      )}
                    </td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDelete(slot._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageSlots;
