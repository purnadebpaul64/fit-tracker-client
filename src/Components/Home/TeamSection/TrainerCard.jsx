import { Card, Chip } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const TrainerCard = ({ trainer }) => {
  const { fullName, about, profileImage, skills, social = {} } = trainer;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      <Card className="flex flex-col justify-between h-full bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden p-4 text-white/80 transition-all duration-300 rounded-xl">
        {/* Image + Overlay */}
        <div className="relative">
          <img
            src={profileImage}
            alt={fullName}
            className="w-full h-72 object-cover rounded-lg "
          />

          {/* Hover overlay with social icons */}
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-white p-2 bg-black/50 hover:bg-white/50 hover:text-black/50 transition-all rounded-full"
              >
                <Facebook size={20} />
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-white p-2 bg-black/50 hover:bg-white/50 hover:text-black/50 transition-all rounded-full"
              >
                <Instagram size={20} />
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-white p-2 bg-black/50 hover:bg-white/50 hover:text-black/50 transition-all rounded-full"
              >
                <Linkedin size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold mt-3">{fullName}</h3>
        <p className="text-sm my-2 text-white/70">{about?.slice(0, 55)}...</p>
        <div className="flex flex-wrap gap-2 ">
          {skills.map((skill) => (
            <Chip
              value={skill}
              className="text-[10px] mt-1 bg-purple-500/20 text-purple-300 border border-purple-500/30"
            />
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default TrainerCard;
