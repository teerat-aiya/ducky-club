import { useQuery } from "@tanstack/react-query";
import { fetchWorkspaces } from "~/services/workspace";

export function useWorkspace() {
  return useQuery({
    queryKey: ["workspace"],
    queryFn: () => fetchWorkspaces().then((response) => response.data),
  });
}
