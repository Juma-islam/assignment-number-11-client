import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

 const fetchAxios = axios.create({
        baseURL: 'http://localhost:5000'
    })

const useAxios = () => {

  const { user } = useAuth();

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = fetchAxios.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      fetchAxios.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return fetchAxios;
}

export default useAxios