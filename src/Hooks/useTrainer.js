import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTrainer = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/trainer/${id}`
  );
  return data;
};

const useTrainer = (id) => {
  return useQuery({
    queryKey: ["trainer", id],
    queryFn: () => fetchTrainer(id),
    enabled: !!id,
  });
};

export default useTrainer;
