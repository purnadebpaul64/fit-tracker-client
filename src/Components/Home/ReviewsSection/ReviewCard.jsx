// components/Home/ReviewCard.jsx

import { Card, Typography, Chip } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const ReviewCard = ({ review }) => {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="bg-white/10 backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/20 transition-all duration-300 text-white p-6 rounded-xl h-full flex flex-col justify-between">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            src={review.userImage}
            alt={review.userName}
            className="w-14 h-14 rounded-full object-cover border border-white/20"
          />
        </div>

        <div className="text-center">
          <Typography variant="h6" className="text-white text-xl mb-6">
            {review.userName}
          </Typography>
        </div>

        <Typography className="mb-4 text-white/90 line-clamp-4 text-center">
          {review.text}
        </Typography>

        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, idx) => (
              <Star
                key={idx}
                size={16}
                fill={idx < review.rating ? "gold" : "none"}
                stroke={idx < review.rating ? "gold" : "#ccc"}
              />
            ))}
          </div>

          <Chip
            value={`Trainer: ${review.trainerName}`}
            className="text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30"
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default ReviewCard;
