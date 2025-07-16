import React from "react";
import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { Link } from "react-router";
const Logo = () => {
  return (
    <Link to={"/"}>
      <motion.div
        className="flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Dumbbell className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-white">FitTracker</span>
      </motion.div>
    </Link>
  );
};

export default Logo;
