import { logOut, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  const navigate = useNavigate();

  // Create Axios instance
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
    withCredentials: true,
  });

  // Configure interceptors if token is present
  if (token) {
    instance.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const status = error.response ? error.response.status : null;
        if (status === 401 || status === 403) {
          dispatch(logOut());
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }

  return instance;
};

export default useAxiosSecure;
