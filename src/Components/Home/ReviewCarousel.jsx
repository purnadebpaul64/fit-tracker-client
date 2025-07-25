import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Star } from "lucide-react";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md h-full flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={review.userImage}
          alt={review.userName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold">{review.userName}</h4>
          <p className="text-sm text-gray-500">{review.userEmail}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-3">{review.text}</p>
      <div className="flex gap-1 text-yellow-500">
        {[...Array(review.rating)].map((_, idx) => (
          <Star key={idx} size={16} fill="currentColor" stroke="currentColor" />
        ))}
      </div>
    </div>
  );
};

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/reviews/top`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to fetch top reviews:", err));
  }, []);

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Top Member Reviews
        </h2>

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

export default ReviewCarousel;
