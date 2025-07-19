import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { Clock, Facebook, Instagram, Linkedin, Users } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const SingleTrainerCard = ({ trainer }) => {
  const { fullName, profileImage, experience, social, availableDays } = trainer;

  return (
    <motion.div variants={fadeInUp}>
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group overflow-hidden p-4 text-white/80">
        {/* <div className="grid grid-cols-3 h-full">
          <div className="col-span-1 h-full">
            <img
              src={profileImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 p-3 h-full">
            <Typography className="text-xl font-semibold text-white/85">
              {fullName}
            </Typography>
            <div className="border-b border-white/30 my-2"></div>
            <div>
              <p className="text-indigo-200">
                Years of Experience :{" "}
                <span className="text-white">{experience}</span>
              </p>
            </div>
            <div className="border-b border-white/30 my-2"></div>
            <Button className="cursor-pointer w-full text-center px-3 py-2 rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Know More
            </Button>
          </div>
        </div> */}
        <div className="">
          <img
            src={profileImage}
            alt=""
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold pt-3">{fullName}</h3>
          <p className="text-sm">
            Years of Experience :{" "}
            <span className="font-semibold text-white">{experience}</span>
          </p>
        </div>
        <div className="text-center py-3">
          <p className="text-sm text-white">Available Days</p>
          {availableDays.map((day) => (
            <Chip
              value={day}
              className="text-xs mr-1 inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30 mb-4"
            />
          ))}
        </div>
        <div className="flex justify-center gap-2 mb-2">
          <div className="p-2 bg-white/10 hover:bg-pink-200/30 transition rounded-full border border-white/75">
            <a href={social?.facebook}>
              <Facebook size={17} />
            </a>
          </div>
          <div className="p-2 bg-white/10 hover:bg-pink-200/30 transition rounded-full border border-white/75">
            <a href={social?.instagram}>
              <Instagram size={17} />
            </a>
          </div>
          <div className="p-2 bg-white/10 hover:bg-pink-200/30 transition rounded-full border border-white/75">
            <a href={social?.linkedin}>
              <Linkedin size={17} />
            </a>
          </div>
        </div>
        <Button className="cursor-pointer w-full text-center px-3 py-2 rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
          Know More
        </Button>
      </Card>
    </motion.div>
  );
};

export default SingleTrainerCard;
