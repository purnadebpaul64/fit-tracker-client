import { Chip } from "@material-tailwind/react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { ArrowRight, CheckCircle } from "lucide-react";
import animationData from "../../assets/Developer_Yoga.json";

const AboutSection = () => {
  const points = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "AI-powered personalized workout plans",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "Real-time progress tracking and analytics",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "Expert-designed fitness programs",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "Supportive community of 2M+ users",
    },
  ];
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Lottie animationData={animationData} loop={true}></Lottie>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <Chip
                value="About Us"
                className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 mb-4"
              />
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Revolutionizing
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  Fitness Technology
                </span>
              </h2>
              <p className="text-xl text-white/70 mb-8">
                We're on a mission to make fitness accessible, enjoyable, and
                effective for everyone. Our platform combines cutting-edge
                technology with proven fitness science to deliver results.
              </p>
            </div>

            <div className="space-y-6">
              {points.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 text-white"
                >
                  <div className="text-green-400">{item.icon}</div>
                  <span className="text-lg">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <button className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-3 text-white font-semibold rounded-md">
              Learn More About Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
