import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, handleSignOutUser, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && user?.accessToken) {
      const requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        }
      );

      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            handleSignOutUser()
              .then(() => console.log("Signed out due to invalid token"))
              .catch(console.error);
          }
          return Promise.reject(err);
        }
      );

      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading]);

  return axiosInstance;
};

export default useAxiosSecure;
