import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chip } from "@material-tailwind/react";
import { motion } from "framer-motion";
import SingleClassCard from "./SingleClassCard";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

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

const FeaturedClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/featured-classes`
        );
        setClasses(res.data);
      } catch (error) {
        console.error("Error fetching featured classes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <motion.section
      className="w-11/12 mx-auto pt-20 pb-16"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="text-center mb-16">
        <motion.div variants={fadeInUp}>
          <Chip
            value="Top Booked"
            className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 mb-4"
          />
        </motion.div>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Our Most Popular
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {" "}
            Classes
          </span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-xl text-white/70 max-w-4xl mx-auto"
        >
          Explore our top 6 most booked fitness classes based on real user
          activity. Join the programs others love!
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
      >
        {classes.map((cls) => (
          <motion.div key={cls._id} variants={fadeInUp}>
            <SingleClassCard cls={cls} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default FeaturedClasses;
