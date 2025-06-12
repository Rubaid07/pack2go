import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosSecure.interceptors.response.use(res => res,(error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('access-token');
          navigate('/signin');
        }
        return Promise.reject(error);
      }
    );
  }, [navigate, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
