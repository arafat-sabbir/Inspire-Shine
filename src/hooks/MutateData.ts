/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";
import { toast } from "sonner";

type HttpMethod = "post" | "put" | "delete" | "patch"; // Add any other methods you might need

const useMutateData = (
  method: HttpMethod,
  path: string,
  requestData?: any, // Optional for methods like `get`
  invalidateQueries?: string[]
) => {
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axios[method](path, requestData); // Dynamic method call
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Operation successful");
      if (invalidateQueries) {
        queryClient.invalidateQueries(invalidateQueries as any);
      }
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export default useMutateData;
