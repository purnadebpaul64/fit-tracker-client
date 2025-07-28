import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Chip } from "@material-tailwind/react";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner/LoadingSpinner";
import SingleForumCard from "./SingleForumCard";
import { Helmet } from "react-helmet-async";

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

const ForumsPage = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchForums = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-forums?page=${page}&limit=6`
        );
        setPosts(res.data.forums);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, [page]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-20">Failed to load forums.</p>
    );
  if (posts.length === 0)
    return (
      <p className="text-white text-center mt-20">No forum posts found.</p>
    );

  return (
    <section className="w-11/12 mx-auto pt-20 pb-16">
      <Helmet>
        <title>FitTracker | Fourm</title>
      </Helmet>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="text-center mb-16"
      >
        <motion.div variants={fadeInUp}>
          <Chip
            value="Community Forums"
            className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 mb-4"
          />
        </motion.div>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Join the{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Discussion
          </span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-xl text-white/70 max-w-4xl mx-auto"
        >
          Browse posts from our community forums and engage with trainers and
          members alike.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {posts.map((post) => (
          <SingleForumCard key={post._id} post={post} />
        ))}
      </motion.div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-white/10 text-white px-4 py-2 rounded disabled:opacity-40"
        >
          Prev
        </button>
        <p className="text-white text-lg">
          Page {page} of {totalPages}
        </p>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-white/10 text-white px-4 py-2 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ForumsPage;
