import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

export const setupLineInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer EDOPQGcIR9uGZsFfPrGK/dtUtAHXclDJGem5D0ELUhnGwZAirQBpL1iJ7gAn5oKA79Xdi6GwjLkcQDrHQQtuIKf6AZf3z76VqRSdKosYMK2tdlfBhKO9Q8eFdF+vcahCAYRrH8dhDIKwo/lpg+cePQdB04t89/1O/w1cDnyilFU=`;
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