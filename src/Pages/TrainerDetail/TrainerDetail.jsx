import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import useTrainer from "../../Hooks/useTrainer";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner/LoadingSpinner";
import { Button, Chip } from "@material-tailwind/react";
import { CircleAlert, Facebook, Instagram, Linkedin } from "lucide-react";

const TrainerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: trainer, isLoading, error } = useTrainer(id);

  if (isLoading) return <LoadingSpinner />;
  if (!trainer)
    return <p className="text-center text-white pt-20">Trainer not found.</p>;

  const {
    _id,
    fullName,
    profileImage,
    experience,
    age,
    skills,
    about,
    social,
    availableDays,
    availableTime,
  } = trainer;

  return (
    <section className="w-11/12 lg:w-10/12 mx-auto pt-20 pb-16">
      {/* Trainer Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Image */}
        <div className="col-span-1">
          <img
            src={profileImage}
            alt="Trainer"
            className="w-full h-full object-cover rounded-2xl max-h-[500px]"
          />
        </div>

        {/* Trainer Details */}
        <div className="col-span-2 p-6 border border-white/50 rounded-xl text-white space-y-3 bg-white/5 hover:bg-white/8 transition">
          <div className="space-y-1.5">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-3xl md:text-4xl font-semibold block">
              {fullName}
            </span>
            <p className="mt-4">Trainer Age: {age}</p>
            <p>Years of Experience: {experience}</p>

            <div className="flex flex-col sm:flex-row gap-2 flex-wrap items-start sm:items-center">
              <p>Expertise in:</p>
              <div className="flex flex-wrap">
                {skills?.map((skill, index) => (
                  <Chip
                    key={index}
                    value={skill}
                    className="text-xs mr-1 mb-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30"
                  />
                ))}
              </div>
            </div>
          </div>

          <hr className="border-white/20" />

          {/* About Section */}
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

      {/* Available Days and Slots */}
      <div className="text-white flex flex-col items-center mt-12 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Available Days</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {availableDays?.map((day, index) => (
              <Chip
                key={index}
                value={day}
                className="text-sm sm:text-md bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30"
              />
            ))}
          </div>
        </div>

        {/* Available Time Slots */}
        {availableTime?.length > 0 && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Available Slots For Booking
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {availableTime.map((slot, index) => (
                <button
                  key={index}
                  onClick={() =>
                    navigate(
                      `/book-session/${_id}?slot=${encodeURIComponent(slot)}`
                    )
                  }
                  className="px-4 py-2 text-sm sm:text-md rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition shadow font-bold"
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Become a Trainer CTA */}
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
          <Button className="px-6 md:px-8 py-2 text-sm md:text-md rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition shadow font-bold mt-5">
            Become A Trainer
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default TrainerDetail;
