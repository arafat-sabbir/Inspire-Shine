import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./AxiosPublic";




type TQuery = {
  searchTerm?: string;
  page?: number;
  categories?: string[];
  sort: string;
};

const useServices = (query?: TQuery) => {
  const axiosPublic = useAxiosPublic();

  // Create a unique key that differentiates when query parameters are not passed
  const queryKey = [
    "getProducts",
    query?.page || 1,
    query?.categories?.join(",") || "all",
    query?.searchTerm || "",
    query?.sort || "desc",
  ];


  // ?page=${query?.page || 1}&categories=${
  //   query?.categories?.join(",") || "all"
  // }&searchTerm=${query?.searchTerm || ""}&sort=${query?.sort || "desc"}


  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/services`
      );
      return res.data.data;
    },
    // Optionally add a query on query key change
    staleTime: 0, // Set to 0 if you want fresh data on every query
  });
};

export default useServices;
