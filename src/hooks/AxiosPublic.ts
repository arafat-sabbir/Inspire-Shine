import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
  withCredentials: true,
});

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
