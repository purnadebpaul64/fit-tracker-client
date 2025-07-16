import { Chip } from "@material-tailwind/react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { ArrowRight, Play, Star, Trophy, Users } from "lucide-react";
import animationData from "../../assets/Fitness.json";
const HeroSection = () => {
  return (
    <section id="home" className="pt-20 pb-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Chip
                value="🚀 New AI-Powered Features"
                className="bg-gradient-to-r inline-block from-purple-500/20 to-pink-500/20 text-purple-300 border-2 border-purple-500/30 text-xs"
              />
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Transform Your
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Fitness Journey
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-lg">
              Track workouts, monitor progress, and achieve your fitness goals
              with our AI-powered platform. Join millions of users worldwide.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className=" flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 font-semibold text-white rounded-lg">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border-2 flex items-center border-white/20 text-white hover:bg-white/10 text-lg px-6 py-3 bg-transparent rounded-lg">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-8 text-white/60"
          >
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>2M+ Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>4.9 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-purple-400" />
              <span>Award Winning</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 h-150 w-150 pt-7">
            <Lottie animationData={animationData} loop={true} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
