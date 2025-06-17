import { Channel } from "~/types/app";
import line from "./line";

export const getFollowerNow = () => line.get<Channel>("/insight/followers?date=" + getTodayYYYYMMDD());

function getTodayYYYYMMDD() {
  const today = new Date();
  const yyyy = today.getFullYear().toString();
  const mm   = String(today.getMonth() + 1).padStart(2, '0'); // เดือน (0–11) +1
  const dd   = String(today.getDate()).padStart(2, '0');      // วัน
  return `${yyyy}${mm}${dd}`;
}
