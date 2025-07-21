import React, { useEffect, useState } from "react";
import { Chip } from "@material-tailwind/react";
import { motion } from "framer-motion";
import axios from "axios";
import ClassCard from "./ClassCard";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner/LoadingSpinner";

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

const AllClasses = () => {
  const [classesData, setClassesData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/classes-with-trainers?page=${page}&limit=6`
      )
      .then((res) => {
        setClassesData(res.data.classes || []);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  if (loading) return <LoadingSpinner />;

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
            value="Popular Classes"
            className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 mb-4"
          />
        </motion.div>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Explore Our{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Classes
          </span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-xl text-white/70 max-w-4xl mx-auto"
        >
          Choose from a variety of fitness classes designed to help you achieve
          your health goals. Each class is taught by certified expert trainers.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {classesData.map((cls) => (
          <ClassCard key={cls._id} classInfo={cls} />
        ))}
      </motion.div>

      <div className="flex justify-center mt-10 gap-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              page === idx + 1
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default AllClasses;
