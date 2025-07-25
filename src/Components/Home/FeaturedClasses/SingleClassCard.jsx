import { Card, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Clock, Users } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const SingleClassCard = ({ cls }) => {
  const { name, description, category, image, totalBookings, duration } = cls;

  return (
    <motion.div variants={fadeInUp}>
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group overflow-hidden p-4 text-white/80">
        <img
          src={image}
          alt={name}
          className="w-full h-60 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-sm text-white/60 mb-2">{category}</p>
        <p className="text-sm mb-4 text-white/70">
          {description?.slice(0, 100)}...
        </p>
        <div className="flex justify-between items-center text-sm text-white/60 mb-4">
          <span className="flex items-center gap-1">
            <Users size={16} /> {totalBookings || 0} Booked
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} /> {duration}
          </span>
        </div>
        <Button
          size="sm"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-full"
        >
          View Details
        </Button>
      </Card>
    </motion.div>
  );
};

export default SingleClassCard;
