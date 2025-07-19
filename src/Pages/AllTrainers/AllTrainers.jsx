import { Chip } from "@material-tailwind/react";
import React from "react";
import { motion } from "framer-motion";
import SingleTrainerCard from "./SingleTrainerCard";
import useTrainers from "../../Hooks/useTrainers";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const AllTrainers = () => {
  const { trainers = [], isLoading, isError } = useTrainers();

  if (isLoading) {
    return <p className="text-white text-center mt-20">Loading trainers...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-20">Failed to load trainers.</p>
    );
  }

  const approvedTrainers = trainers.filter(
    (trainer) => trainer.status === "approved"
  );

  if (approvedTrainers.length === 0) {
    return (
      <p className="text-white text-center mt-20">
        No approved trainers found.
      </p>
    );
  }

  return (
    <section className="w-11/12 mx-auto pt-20 pb-16">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="text-center mb-16"
      >
        <motion.div variants={fadeInUp}>
          <Chip
            value="Expert Trainers"
            className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 mb-4"
          />
        </motion.div>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Meet Our Expert
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {" "}
            Trainers
          </span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-xl text-white/70 max-w-4xl mx-auto"
        >
          Discover our certified fitness trainers who are ready to guide you
          toward your health and wellness goals. Browse through their profiles,
          skills, and availability to find your perfect match.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {approvedTrainers.map((trainer) => (
          <SingleTrainerCard key={trainer._id} trainer={trainer} />
        ))}
      </motion.div>
    </section>
  );
};

export default AllTrainers;
