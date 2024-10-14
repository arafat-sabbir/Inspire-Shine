import axios from "axios";

const instance = axios.create({
  baseURL: `https://inspire-shine-server.vercel.app/api`,
  withCredentials: true,
});

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
