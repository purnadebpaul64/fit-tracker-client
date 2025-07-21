import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useTrainer from "../../Hooks/useTrainer";
import useTrainerSlots from "../../Hooks/useTrainerSlots";
import { CircleChevronRight, CircleDollarSign } from "lucide-react";
import { Chip } from "@material-tailwind/react";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";

const TrainerBooked = () => {
  const { id: trainerId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const slotId = new URLSearchParams(location.search).get("slotId");
  const { user } = useAuth();

  const { data: trainer, isLoading: trainerLoading } = useTrainer(trainerId);
  const { data: slots, isLoading: slotsLoading } = useTrainerSlots(trainerId);

  const [selectedPackage, setSelectedPackage] = useState("");

  if (trainerLoading || slotsLoading) return <LoadingSpinner></LoadingSpinner>;

  const slot = slots?.find((s) => s._id === slotId);

  const handleJoinNow = () => {
    if (!selectedPackage) {
      toast("Please select a package first.");
      return;
    }

    const bookingData = {
      trainerId,
      trainerName: trainer?.fullName,
      slotId,
      slotName: slot?.slotName,
      userEmail: user?.email,
      package: selectedPackage,
    };

    navigate("/payment", { state: bookingData });
  };

  const Packages = [
    {
      type: "Basic",
      price: 10,
      benefits: ["Gym Access", "Cardio & Strength Equipment"],
      gradient: "from-blue-500 to-blue-700",
    },
    {
      type: "Standard",
      price: 50,
      benefits: [
        "All Basic Benefits",
        "Group Fitness Classes",
        "Personal Training",
      ],
      gradient: "from-purple-500 to-purple-700",
    },
    {
      type: "Premium",
      price: 100,
      benefits: [
        "All Standard Benefits",
        "Locker Room + Sauna",
        "Massage & Nutrition Discounts",
      ],
      gradient: "from-yellow-500 to-yellow-700",
    },
  ];

  return (
    <section className="w-11/12 lg:w-10/12 mx-auto pt-20 pb-16 text-white">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Complete Your Booking
        </h2>
        <p className="mt-2 text-white/70 text-sm md:text-base">
          Choose the best package that fits your goals.
        </p>
      </div>

      {/* Trainer Info */}
      <div className="border border-white/20 rounded-xl p-6 bg-white/5 mb-10">
        <div className="space-y-2 text-md md:text-xl">
          <div className="flex gap-2">
            <span className="font-semibold">Trainer :</span>{" "}
            <Chip
              value={trainer?.fullName}
              className="text-xs mr-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30"
            />
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Selected Slot :</span>{" "}
            <Chip
              value={`${slot?.slotName}  —  ${slot?.slotTime}`}
              className="text-xs mr-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30"
            />
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Assigned Class :</span>{" "}
            <Chip
              value={slot?.className}
              className="text-xs mr-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30"
            />
          </div>
        </div>
      </div>

      {/* Packages */}
      <h3 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
        <CircleDollarSign className="text-green-400" size={22} />
        Membership Packages
      </h3>

      <div className="w-full lg:w-10/12 mx-auto grid gap-6 md:grid-cols-3 mb-10">
        {Packages.map((pkg) => {
          const isSelected = selectedPackage === pkg.type;
          return (
            <div
              key={pkg.type}
              className={`relative p-6 rounded-2xl border cursor-pointer transition-transform transform hover:scale-[1.02] bg-white/5 ${
                isSelected ? "border-blue-400 shadow-lg" : "border-white/20"
              }`}
              onClick={() => setSelectedPackage(pkg.type)}
            >
              <div className="mb-4">
                <h4 className="text-xl font-bold mb-1">{pkg.type} Package</h4>
                <p className="text-3xl font-bold text-white">${pkg.price}</p>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-gray-200">
                {pkg.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {/* <span className="w-2 h-2 rounded-full bg-blue-400" /> */}
                    <CircleChevronRight size={15} color="#fc5cff" />
                    {benefit}
                  </li>
                ))}
              </ul>

              {isSelected && (
                <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-2 py-1 rounded-bl-md text-white">
                  Selected
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Button */}
      <div className="text-center mt-10">
        <button
          onClick={handleJoinNow}
          className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition shadow-md"
        >
          Join Now
        </button>
      </div>
    </section>
  );
};

export default TrainerBooked;
