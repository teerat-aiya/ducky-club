import axios, { AxiosInstance } from "axios";
import { setupLineInterceptors } from "./lineInterceptors";

const line: AxiosInstance = axios.create({
  baseURL: "https://api.line.me/v2/bot",
});

setupLineInterceptors(line);

export default line