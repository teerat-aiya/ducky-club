import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

export const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${import.meta.env.VITE_LINE_CHANNEL_ACCESS_TOKEN}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // store.dispatch(logout());
      }
      return Promise.reject(error);
    }
  );
};