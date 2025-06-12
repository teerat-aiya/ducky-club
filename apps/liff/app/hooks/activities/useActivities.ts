import { useQuery } from "@tanstack/react-query";
import { fetchActivities } from "~/services/activity";
import { fetchWorkspaces } from "~/services/workspace";

export function useActivities() {
  return useQuery({
    queryKey: ["activities"],
    queryFn: () => fetchActivities().then((response) => response.data),
  });
}
