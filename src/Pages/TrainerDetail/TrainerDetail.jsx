import React from "react";
import { useNavigate, useParams, Link } from "react-router";
import { Button, Chip } from "@material-tailwind/react";
import { Facebook, Instagram, Linkedin, CircleAlert } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner/LoadingSpinner";
import useTrainerSlots from "../../Hooks/useTrainerSlots";
import { Helmet } from "react-helmet-async";

const TrainerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTrainer = async (id) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/trainer/${id}`
    );
    return data;
  };

  const {
    data: trainer,
    isLoading: trainerLoading,
    isError,
  } = useQuery({
    queryKey: ["trainer", id],
    queryFn: () => fetchTrainer(id),
    enabled: !!id,
  });

  const trainerEmail = trainer?.email;

  const { data: slots = [], isLoading: slotsLoading } = useTrainerSlots(
    trainerEmail,
    !!trainerEmail
  ); // ✅ always call, use enabled

  if (trainerLoading || slotsLoading) return <LoadingSpinner />;
  if (!trainer)
    return <p className="text-center text-white pt-20">Trainer not found.</p>;

  const {
    _id,
    fullName,
    profileImage,
    experience,
    age,
    skills = [],
    about,
    social = {},
  } = trainer;

  return (
    <section className="w-11/12 lg:w-10/12 mx-auto pt-20 pb-16">
      <Helmet>
        <title>Details</title>
      </Helmet>

      {/* Trainer Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <img
            src={profileImage}
            alt={fullName}
            className="w-full h-full object-cover rounded-2xl max-h-[500px]"
          />
        </div>

        <div className="col-span-2 p-6 border border-white/50 rounded-xl text-white space-y-3 bg-white/5 hover:bg-white/8 transition">
          <div className="space-y-1.5">
            <h1 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {fullName}
            </h1>
            <p className="mt-4">Trainer Age: {age}</p>
            <p>Years of Experience: {experience}</p>

            <div className="flex flex-col sm:flex-row gap-2 flex-wrap items-start sm:items-center">
              <p>Expertise in:</p>
              <div className="flex flex-wrap">
                {skills.map((skill, i) => (
                  <Chip
                    key={i}
                    value={skill}
                    className="text-xs mr-1 mb-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30"
                  />
                ))}
              </div>
            </div>
          </div>

          <hr className="border-white/20" />
          <div>
            <div className="flex gap-2 items-center text-xl font-semibold">
              <p>About</p>
              <CircleAlert size={20} />
            </div>
            <p className="mt-2 leading-7 text-[17px]">{about}</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 mt-3">
            {social?.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 hover:bg-pink-200/30 transition rounded-full border border-white/75"
              >
                <Facebook size={20} />
              </a>
            )}
            {social?.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 hover:bg-pink-200/30 transition rounded-full border border-white/75"
              >
                <Instagram size={20} />
              </a>
            )}
            {social?.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/10 hover:bg-pink-200/30 transition rounded-full border border-white/75"
              >
                <Linkedin size={20} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Available Slots */}
      <div className="w-full mt-12">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold text-white mb-4">
          Available Slots
        </h2>

        {slots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {slots.map((slot) => (
              <div
                key={slot._id}
                className="bg-white/5 border border-white/10 rounded-lg p-4 text-white space-y-2 hover:bg-white/10 transition"
              >
                <p>
                  <strong>Slot Name:</strong> {slot.slotName}
                </p>
                <div className="flex items-center">
                  <strong className="mr-1">Day : </strong>
                  {slot.availableDays?.map((day, i) => (
                    <Chip
                      key={i}
                      value={day}
                      className="text-xs mr-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30"
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <strong>Time:</strong>{" "}
                  <Chip
                    value={slot.slotTime}
                    className="text-xs mr-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30"
                  />
                </div>
                <p>
                  <strong>Class:</strong> {slot.className}
                </p>
                <button
                  onClick={() =>
                    navigate(`/book-session/${_id}?slotId=${slot._id}`)
                  }
                  className="mt-2 w-full px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white mt-10 text-center">
            No slots available yet.
          </p>
        )}
      </div>

      {/* Call to Action */}
      <div className="w-full mt-20 py-16 px-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white text-center rounded-2xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Become a Certified Trainer
        </h1>
        <p className="text-base md:text-lg max-w-2xl mx-auto">
          Turn your passion for fitness into a career. Inspire, coach, and lead
          others toward their health goals by joining our professional trainer
          network.
        </p>
        <Link to="/become-trainer">
          <Button className="mt-5 px-6 md:px-8 py-2 rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow font-bold">
            Become A Trainer
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default TrainerDetail;
