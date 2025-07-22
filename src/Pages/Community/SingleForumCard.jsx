import { Card, Chip, Button } from "@material-tailwind/react";
import { Clock, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

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

const SingleForumCard = ({ post }) => {
  const { _id, title, content, creator, createdAt, upvotes } = post;

  const timeAgo = getTimeAgo(createdAt);
  const words = content.trim().split(/\s+/);
  const shortContent =
    words.slice(0, 15).join(" ") + (words.length > 15 ? "......" : "");

  return (
    <motion.div variants={fadeInUp}>
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group overflow-hidden p-4 text-white/80">
        {/* Top section: Avatar + Creator Info */}
        <div className="flex gap-3 items-center">
          <img
            src={creator?.image}
            alt={creator?.name}
            className="h-14 w-14 rounded-full"
          />
          <div>
            <div className="flex gap-2 items-center">
              <h3 className="text-xl font-semibold">{creator.name}</h3>
              <Chip
                value={creator.role}
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30"
              />
            </div>
            <div className="flex gap-2 items-center text-sm text-white/60">
              <Clock size={15} />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="mt-4">
          <h3 className="text-2xl font-semibold pt-3">{title}</h3>
          <p className="mt-2">{shortContent}</p>
        </div>

        {/* footer section */}
        <div className="flex justify-between mt-4 items-end">
          <div className="flex gap-2">
            <ThumbsUp size={15} />
            <p className="text-sm">{upvotes}</p>
          </div>
          <Link to={`/forums/${_id}`}>
            <Button
              size="sm"
              variant="text"
              className="mt-2 px-3 py-2 rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Read more
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default SingleForumCard;
