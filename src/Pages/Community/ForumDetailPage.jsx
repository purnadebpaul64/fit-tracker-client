import { useParams } from "react-router";
import { Card, Chip, Button } from "@material-tailwind/react";
import { Clock, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import useSingleForum from "../../Hooks/useSingleForum";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../Hooks/useAuth"; // ✅ assuming you have this

const fadeIn = {
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

const ForumDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth(); // ✅ get current user
  const { forum: post, isLoading, isError, refetch } = useSingleForum(id);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !post?._id)
    return (
      <p className="text-center text-red-500">Failed to load forum post.</p>
    );

  const {
    title,
    content,
    creator,
    createdAt,
    upvotes,
    downvotes,
    upvotedUsers,
    downvotedUsers,
  } = post;
  const timeAgo = getTimeAgo(createdAt);
  const isCreator = user?.email === creator?.email;

  const hasUpvoted = upvotedUsers?.includes(user?.email);
  const hasDownvoted = downvotedUsers?.includes(user?.email);

  const handleVote = async (type) => {
    if (isCreator) {
      toast.error("You can't vote on your own forum.");
      return;
    }

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/forums/vote/${id}`,
        {
          voteType: type,
          userEmail: user?.email,
        }
      );

      refetch(); // refresh votes
    } catch (err) {
      console.log(err);

      toast.error("Voting failed");
    }
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      transition="transition"
      className="max-w-3xl mx-auto mt-10 px-4"
    >
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-6 text-white/80">
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={creator?.image}
            alt={creator?.name}
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold">{creator?.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Chip
                value={creator?.role}
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30"
              />
              <div className="flex items-center gap-1 text-sm text-white/60">
                <Clock size={16} />
                <span>{timeAgo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Post Title + Content */}
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-white/90 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>

        {/* Voting Buttons */}
        <div className="flex justify-start items-center gap-4 mt-6">
          <Button
            size="sm"
            disabled={isCreator}
            onClick={() => handleVote("up")}
            className={`flex items-center gap-2 text-white transition-all ${
              hasUpvoted
                ? "bg-green-600"
                : "bg-gradient-to-r from-green-500 to-lime-500"
            }`}
          >
            <ThumbsUp size={18} />
            {upvotes}
          </Button>

          <Button
            size="sm"
            disabled={isCreator}
            onClick={() => handleVote("down")}
            className={`flex items-center gap-2 text-white transition-all ${
              hasDownvoted
                ? "bg-red-600"
                : "bg-gradient-to-r from-red-500 to-pink-500"
            }`}
          >
            <ThumbsDown size={18} />
            {downvotes}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ForumDetailPage;
