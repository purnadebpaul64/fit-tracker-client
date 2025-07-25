import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Star } from "lucide-react";
import {
  Card,
  Typography,
  Chip,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const ReviewCard = ({ review }) => {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group overflow-hidden p-4 text-white/80">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={review.userImage}
            alt={review.userName}
            className="w-12 h-12 rounded-full object-cover border border-white/20"
          />
          <div>
            <Typography variant="h6" className="text-white">
              {review.userName}
            </Typography>
            <Typography className="text-xs text-gray-300">
              {review.userEmail}
            </Typography>
          </div>
        </div>

        <Typography className="mb-4 text-white/90">{review.text}</Typography>

        <div className="flex gap-1 mb-3">
          {[...Array(review.rating)].map((_, idx) => (
            <Star key={idx} size={16} fill="gold" stroke="gold" />
          ))}
        </div>

        <Chip
          value={review.trainerName}
          className="text-xs inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30"
        />
      </Card>
    </motion.div>
  );
};

const TopReviewsSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/reviews/top`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to fetch top reviews:", err));
  }, []);

  return (
    <section className="bg-gradient-to-br from-[#1e1e2f] via-[#151525] to-[#0e0e1a] py-14">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Typography variant="h2" className="text-white font-bold mb-2">
            What Members Are Saying
          </Typography>
          <Typography className="text-white/70 max-w-xl mx-auto">
            Read what our users think about our trainers and programs.
          </Typography>
        </motion.div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={3}
          loop
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopReviewsSection;
