// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const fetchTrainerSlots = async (trainerId) => {
//   const { data } = await axios.get(
//     `${import.meta.env.VITE_API_URL}/slots/${trainerId}`
//   );
//   return data;
// };

// const useTrainerSlots = (trainerId) => {
//   return useQuery({
//     queryKey: ["trainer-slots", trainerId],
//     queryFn: () => fetchTrainerSlots(trainerId),
//     enabled: !!trainerId,
//   });
// };

// export default useTrainerSlots;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTrainerSlots = async (email) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/slots-email/${email}`
  );
  return data;
};

export default function useTrainerSlots(email) {
  return useQuery({
    queryKey: ["trainer-slots", email],
    queryFn: () => fetchTrainerSlots(email),
    enabled: !!email,
  });
}
