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
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
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
    <section className="w-10/12 mx-auto pt-20 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <img
            src={profileImage}
            alt=""
            className="w-full h-10/12 object-cover rounded-2xl"
          />
        </div>
        <div className="col-span-2 p-6 border border-white/50 rounded-xl h-10/12 text-white space-y-3 bg-white/5 hover:bg-white/8 transition">
          <div className="space-y-1.5">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-4xl font-semibold">
              {" "}
              {fullName}
            </span>
            <p className="mt-4">Trainer Age : {age}</p>
            <p>Years of Experience : {experience}</p>
            <div className="flex gap-2">
              <p>Expertise in : </p>
              <div>
                {skills.map((skill) => (
                  <Chip
                    key={_id}
                    value={skill}
                    className="text-xs mr-1 inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30 mb-4"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="border border-white/20"></div>
          <div>
            <div className="flex gap-2 items-center text-xl font-semibold">
              <p>About</p>
              <CircleAlert size={20} />
            </div>
            <div className="mt-2">
              <p className="leading-7 text-[17px]">{about}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <div className="p-2 bg-white/10 hover:bg-pink-200/30 transition rounded-full border border-white/75">
              <a href={social?.facebook} target="_blank">
                <Facebook size={20} />
              </a>
            </div>
            <div className="p-2 bg-white/10 hover:bg-pink-200/30 transition rounded-full border border-white/75">
              <a href={social?.instagram} target="_blank">
                <Instagram size={20} />
              </a>
            </div>
            <div className="p-2 bg-white/10 hover:bg-pink-200/30 transition rounded-full border border-white/75">
              <a href={social?.linkedin} target="_blank">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white flex flex-col items-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl">Available Days</h2>
          <div className="flex gap-2">
            {availableDays.map((day) => (
              <Chip
                key={_id}
                value={day}
                className="text-lg mr-1 inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30 mb-4"
              />
            ))}
          </div>
        </div>
        <div className="-mt-5">
          <div className="flex gap-2">
            {availableTime?.length > 0 && (
              <div className="mt-8 text-center space-y-4">
                <h2 className="text-3xl text-white">
                  Available Slots For Booking
                </h2>
                <div className="flex flex-wrap gap-3 justify-center">
                  {availableTime.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        navigate(
                          `/book-session/${_id}?slot=${encodeURIComponent(
                            slot
                          )}`
                        )
                      }
                      className="px-4 py-2 text-md rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition shadow font-bold cursor-pointer"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full py-20 bg-gradient-to-r from-purple-500/30 to-pink-500/30  text-white text-center rounded-2xl mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Become a Certified Trainer
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Turn your passion for fitness into a career. Inspire, coach, and lead
          others toward their health goals by joining our professional trainer
          network.
        </p>
        <Link to={"/become-trainer"}>
          <Button className="px-8 py-2 text-md rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition shadow font-bold cursor-pointer mt-5">
            Become A Trainer
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default TrainerDetail;
