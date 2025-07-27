import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import useAuth from "../../../Hooks/useAuth";

const BookedTrainerPage = () => {
  const { user } = useAuth();
  const token = user?.accessToken;
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });
  console.log(bookings);

  if (isLoading) return <p>Loading...</p>;

  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="border p-4 rounded-lg shadow">
            <img
              src={booking.trainer?.profileImage}
              alt="Trainer"
              className="w-16 h-16  object-center rounded-full my-2"
            />
            <h2 className="text-xl font-bold">
              Trainer: {booking.trainer?.fullName}
            </h2>

            <p>
              <strong>Email:</strong> {booking.trainer?.email}
            </p>
            <p>
              <strong>Experience:</strong> {booking.trainer?.experience} years
            </p>
            <p>
              <strong>Slot:</strong> {booking.slot?.slotName} (
              {booking.slot?.slotTime})
            </p>
            <p>
              <strong>Class:</strong> {booking.slot?.className}
            </p>
            <p>
              <strong>Package:</strong> {booking.package}
            </p>
            <p>
              <strong>Payment Status:</strong> {booking.paymentStatus}
            </p>

            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setSelectedBooking(booking)}
            >
              Review
            </button>
          </div>
        ))}

        {selectedBooking && (
          <ReviewModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </div>
    </section>
  );
};

export default BookedTrainerPage;
