// import React from "react";
// import { Button, Card, Chip } from "@material-tailwind/react";
// import { motion } from "framer-motion";
// import { Link } from "react-router";

// const fadeInUp = {
//   initial: { opacity: 0, y: 60 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.6 },
// };

// const ClassCard = ({ classInfo }) => {
//   const { _id, name, description, trainers, image, category = [] } = classInfo;

//   return (
//     <motion.div variants={fadeInUp}>
//       <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group overflow-hidden p-4 text-white/80">
//         <div>
//           <img
//             src={image}
//             className="h-56 w-full object-cover rounded-lg mb-4"
//           />
//         </div>
//         <h3 className="text-2xl font-semibold mb-2">{name}</h3>
//         <div className="flex mb-3">
//           <Chip
//             value={category}
//             className="text-xs mr-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30"
//           />
//         </div>
//         <p className="text-sm text-white/70 mb-4">{description}</p>

//         <p className="text-white font-semibold mb-2">Top Trainers:</p>
//         <div className="flex -space-x-3 mb-4">
//           {trainers.slice(0, 5).map((trainer) => (
//             <Link to={`/trainer-detail/${trainer._id}`} key={trainer._id}>
//               <img
//                 src={trainer.profileImage}
//                 alt={trainer.fullName}
//                 title={trainer.fullName}
//                 className="w-10 h-10 object-cover rounded-full border-2 border-purple-500 hover:z-10 transition-all"
//               />
//             </Link>
//           ))}
//         </div>

//         <Link to={`/class-detail/${_id}`}>
//           <Button className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
//             View Details
//           </Button>
//         </Link>
//       </Card>
//     </motion.div>
//   );
// };

// export default ClassCard;

import React from "react";
import { Button, Card, Chip } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const ClassCard = ({ classInfo }) => {
  const {
    _id,
    name = "Unnamed Class",
    description = "No description provided.",
    trainers = [], // make sure it's always an array
    image = "https://via.placeholder.com/400x300", // fallback image
    category = "Uncategorized",
  } = classInfo;

  return (
    <motion.div variants={fadeInUp}>
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group overflow-hidden p-4 text-white/80">
        <div>
          <img
            src={image}
            className="h-56 w-full object-cover rounded-lg mb-4"
            alt={name}
          />
        </div>

        <h3 className="text-2xl font-semibold mb-2">{name}</h3>

        <div className="flex mb-3">
          <Chip
            value={category}
            className="text-xs mr-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30"
          />
        </div>

        <p className="text-sm text-white/70 mb-4">{description}</p>

        {trainers.length > 0 && (
          <>
            <p className="text-white font-semibold mb-2">Top Trainers:</p>
            <div className="flex -space-x-3 mb-4">
              {trainers.slice(0, 5).map((trainer) => (
                <Link to={`/trainer-detail/${trainer._id}`} key={trainer._id}>
                  <img
                    src={
                      trainer.profileImage || "https://via.placeholder.com/40"
                    }
                    alt={trainer.fullName || "Trainer"}
                    title={trainer.fullName || "Trainer"}
                    className="w-10 h-10 object-cover rounded-full border-2 border-purple-500 hover:z-10 transition-all"
                  />
                </Link>
              ))}
            </div>
          </>
        )}

        <Link to={`/class-detail/${_id}`}>
          <Button className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            View Details
          </Button>
        </Link>
      </Card>
    </motion.div>
  );
};

export default ClassCard;
