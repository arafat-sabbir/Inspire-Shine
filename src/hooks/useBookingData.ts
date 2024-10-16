import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";

const useBookings = () => {
  const axios = useAxiosSecure();

  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axios.get(`/my-bookings`);
      return res.data.data;
    },
  });
};

export default useBookings;
