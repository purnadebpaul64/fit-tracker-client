import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Chip, Button, Card } from "@material-tailwind/react";
import { motion } from "framer-motion";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner/LoadingSpinner";

const ClassDetails = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/classes/${id}/details`)
      .then((res) => {
        setClassData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching class:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!classData)
    return (
      <div className="text-center mt-10 text-red-500">Class not found.</div>
    );

  const {
    name,
    image,
    description,
    category,
    trainers,
    duration,
    totalBookings,
  } = classData;
  console.log(classData);

  return (
    <motion.div
      className="w-10/12 mx-auto mt-25 mb-15"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6 lg:p-10 bg-white/10 border border-white/20 shadow-lg rounded-2xl flex flex-col lg:flex-row gap-6 text-white/80 items-center">
        <img
          src={image}
          alt={name}
          className="w-full lg:w-1/2 h-full object-cover rounded-xl"
        />
        <div className="space-y-3">
          <Typography variant="h3" className="text-4xl">
            {name}
          </Typography>
          <Chip
            value={category}
            className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 mb-4"
          />
          <Typography>{description}</Typography>

          <div className="flex items-center gap-2 mt-6">
            <div className="text-center">
              <Chip
                value="Available"
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30"
              />
              <Typography variant="h5" className="mb-2 text-xl">
                Trainers
              </Typography>
            </div>
            <div className="flex gap-3 flex-wrap">
              {trainers?.map((trainer) => (
                <Link key={trainer._id} to={`/trainer-detail/${trainer._id}`}>
                  <img
                    src={trainer.profileImage}
                    alt={trainer.fullName}
                    title={trainer.fullName}
                    className="w-16 h-16 rounded-full border-2 border-gray-200 hover:scale-105 transition"
                  />
                </Link>
              ))}
            </div>
          </div>
          {/* <Link to={`/book-class/${id}`}>
            <Button
              color="blue"
              className="cursor-pointer w-fit text-center px-3 py-2 rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition"
            >
              Book This Class
            </Button>
          </Link> */}
        </div>
      </Card>
    </motion.div>
  );
};

export default ClassDetails;
