import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./AxiosPublic";

const useFetchData = (path: string,) => {


  const axios = useAxiosPublic();
  const key = path.split("/")[1];

  // Determine if the query should be enabled based on `enabled` parameter and user existence
  
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axios.get(path);
      return res.data.data;
    }
  });
};

export default useFetchData;
