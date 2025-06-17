import { useQuery } from "@tanstack/react-query";
import { getFollowerNow } from "~/services/channel";

export function useFollowerNow() {
  return useQuery({
    queryKey: ["insight","follower"],
    queryFn: () => getFollowerNow().then((response) => response.data),
  });
}
