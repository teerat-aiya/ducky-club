import axios, { AxiosInstance } from "axios";

const n8n: AxiosInstance = axios.create({
  baseURL: "https://lalitchaya-aiya.app.n8n.cloud/webhook",
});

export default n8n