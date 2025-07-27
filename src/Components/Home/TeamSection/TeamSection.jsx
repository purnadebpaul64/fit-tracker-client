import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chip } from "@material-tailwind/react";
import { motion } from "framer-motion";
import TrainerCard from "./TrainerCard";

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const TeamSection = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/approved-trainers`
        );
        setTrainers(res.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching trainers", error);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <motion.section
      className="w-11/12 mx-auto pt-20 pb-16"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Heading */}
      <motion.div className="text-center mb-16">
        <motion.div variants={fadeInUp}>
          <Chip
            value="Meet the Team"
            className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 mb-4"
          />
        </motion.div>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Our Professional{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Trainers
          </span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-xl text-white/70 max-w-4xl mx-auto"
        >
          Get to know the experts behind your transformation. Our certified
          trainers bring years of experience and passion to every session.
        </motion.p>
      </motion.div>

      {/* Trainer Cards Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={staggerContainer}
      >
        {trainers.map((trainer) => (
          <motion.div
            key={trainer._id}
            variants={fadeInUp}
            className="h-full flex"
          >
            <TrainerCard trainer={trainer} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default TeamSection;
