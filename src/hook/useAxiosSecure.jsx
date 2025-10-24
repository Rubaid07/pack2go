import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, logOut, loading } = useContext(AuthContext); // 🔴 CHANGE: handleSignOutUser → logOut

  useEffect(() => {
    if (!loading && user) {
      const setupInterceptors = async () => {
        try {
          let token;
          if (user?.accessToken) {
            token = user.accessToken;
          } else if (user?.getIdToken) {
            token = await user.getIdToken();
          } else {
            console.error('No token available');
            return;
          }

          const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
              config.headers.Authorization = `Bearer ${token}`;
              console.log('API Request with token:', config.method?.toUpperCase(), config.url);
              return config;
            }
          );

          const responseInterceptor = axiosInstance.interceptors.response.use(
            (res) => {
              console.log('API Response:', res.status, res.config.url);
              return res;
            },
            async (err) => {
              console.error('API Error:', err.response?.status, err.config?.url);
              
              if (err?.response?.status === 401 || err?.response?.status === 403) {
                try {
                  await logOut(); // 🔴 CHANGE: handleSignOutUser → logOut
                  console.log("Signed out due to invalid token");
                } catch (signOutError) {
                  console.error("Sign out error:", signOutError);
                }
              }
              return Promise.reject(err);
            }
          );

          return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
          };
        } catch (error) {
          console.error('Interceptor setup error:', error);
        }
      };

      setupInterceptors();
    }
  }, [user, loading, logOut]); // 🔴 CHANGE: handleSignOutUser → logOut

  return axiosInstance;
};

export default useAxiosSecure;