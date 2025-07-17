import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Activity, Calendar, Heart, Target, Users, Zap } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const FeaturedSection = () => {
  const boxContents = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Workout Tracking",
      description:
        "Log exercises, sets, reps, and weights with our intuitive interface.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal Setting",
      description:
        "Set and track personalized fitness goals with AI-powered recommendations.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health Monitoring",
      description:
        "Monitor heart rate, calories burned, and other vital health metrics.",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Workout Plans",
      description:
        "Access thousands of professionally designed workout routines.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description:
        "Connect with like-minded fitness enthusiasts and share your journey.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Insights",
      description:
        "Get personalized insights and recommendations powered by AI.",
    },
  ];
  return (
    <section id="features" className="py-15">
      <div className="container mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Chip
              value="Features"
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-2 border-purple-500/30 text-sm font-medium inline-block mb-4"
            />
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Everything You Need to
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Stay Fit
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Comprehensive tools and features designed to help you achieve your
            fitness goals faster and more efficiently.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {boxContents.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group p-4">
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="p-0 bg-transparent"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <Typography variant="h5" color="white" className="text-xl">
                    {feature.title}
                  </Typography>
                </CardHeader>

                <CardBody className="px-0">
                  <Typography variant="paragraph" className="text-white/70">
                    {feature.description}
                  </Typography>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;
