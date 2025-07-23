import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const NewsletterSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { name, email } = formData;
      if (!name || !email) {
        return toast.error("Please fill in both name and email");
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/newsletter`,
        {
          name,
          email,
        }
      );
      setLoading(false);
      toast.success("Successfully Subscribed!");
      setFormData({ name: "", email: "" });
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("You're already subscribed.");
      } else {
        toast.error("Subscription failed. Try again.");
      }
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-6 md:p-12 text-center backdrop-blur-sm border border-white/10"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Stay Updated with
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              FitTracker
            </span>
          </h2>

          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Get the latest fitness tips, workout plans, and exclusive content
            delivered to your inbox weekly.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 rounded-md focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 rounded-md focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-md font-semibold transition-all whitespace-nowrap"
            >
              {loading ? "Subscribeing..." : "Subscribe Now"}
            </button>
          </form>

          <p className="text-white/50 text-sm mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
