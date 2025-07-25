import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Chip, Button, Card } from "@material-tailwind/react";
import { Clock, ThumbsUp } from "lucide-react";
import { Link } from "react-router";

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

const getTimeAgo = (createdAt) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffMs = now - createdDate;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
};

const LatestCommunityPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/forums/latest`)
      .then((res) => setPosts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!posts.length)
    return (
      <p className="text-white text-center py-12 text-lg">
        No forum posts available.
      </p>
    );

  return (
    <section className="w-11/12 mx-auto pt-16 pb-10">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="text-center mb-14"
      >
        <motion.div variants={fadeInUp}>
          <Chip
            value="Latest Community Posts"
            className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 mb-4"
          />
        </motion.div>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          What’s New in the{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Community
          </span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-white/70 text-lg max-w-3xl mx-auto"
        >
          Discover the latest discussions, questions, and articles from fellow
          trainers and fitness lovers.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts.map((post) => {
          const {
            _id,
            title,
            content,
            creator,
            createdAt,
            upvotes,
            downvotes,
          } = post;

          const preview =
            content?.trim().split(/\s+/).slice(0, 15).join(" ") +
            (content?.split(" ").length > 15 ? "..." : "");

          return (
            <motion.div key={_id} variants={fadeInUp}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 p-4 text-white/80 group overflow-hidden">
                {/* Creator Info */}
                <div className="flex gap-3 items-center mb-3">
                  <img
                    src={creator?.image}
                    alt={creator?.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <div className="flex gap-2 items-center">
                      <h3 className="font-medium">{creator?.name}</h3>
                      <Chip
                        value={creator?.role}
                        className="bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      />
                    </div>
                    <div className="flex gap-1 items-center text-sm text-white/60">
                      <Clock size={14} /> <span>{getTimeAgo(createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Title + Content */}
                <h4 className="text-xl font-semibold">{title}</h4>
                <p className="text-sm mt-2 text-white/70">{preview}</p>

                {/* Bottom Actions */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={14} /> {upvotes}
                    </div>
                    <div className="flex items-center gap-1">
                      👎 {downvotes}
                    </div>
                  </div>

                  <Link to={`/forums/${_id}`}>
                    <Button
                      size="sm"
                      variant="text"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-md hover:scale-105"
                    >
                      Read more
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default LatestCommunityPosts;
