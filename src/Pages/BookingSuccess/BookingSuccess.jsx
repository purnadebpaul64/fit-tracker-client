import { PartyPopper } from "lucide-react";
import Confetti from "react-confetti";
import { Helmet } from "react-helmet-async";

const BookingSuccess = () => {
  return (
    <section className="w-full">
      <Helmet>
        <title>Congratulation..</title>
      </Helmet>
      <div className="w-full">
        <Confetti />
      </div>
      <div className="relative max-w-md mx-auto mt-30 mb-20 p-8 bg-green-100 rounded text-green-900 text-center">
        <div className="flex flex-col items-center gap-4">
          <PartyPopper size={30} />
          <h2 className="text-2xl font-bold">Booking Successful!</h2>
          <p>Thank you for your booking.</p>
        </div>
      </div>
    </section>
  );
};

export default BookingSuccess;
