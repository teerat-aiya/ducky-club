import { useQuery } from "@tanstack/react-query";
import { useLineLiff } from "./useLineLiff";

export function useLineProfile() {
  const { data: liff } = useLineLiff();

  return useQuery({
    queryKey: ["me"],
    queryFn: () => liff?.getProfile(),
    enabled: liff != null,
  });
}
