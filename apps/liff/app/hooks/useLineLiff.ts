import { useQuery } from "@tanstack/react-query";
import liff from "@line/liff";
import { useParams } from "@remix-run/react";

interface UseLineLiffProps {}

export function useLineLiff() {
  const liffId = import.meta.env.VITE_LIFF_ID as string;

  return useQuery({
    queryKey: ["liff", liffId],
    queryFn: () => initLiff({ liffId: liffId as string }),
    enabled: liff ? true : false,
  });
}

const initLiff = async ({ liffId }: { liffId: string }) => {
  console.log("LIFF loading", liffId);
  await liff.init({ liffId: liffId as string });
  console.log("LIFF initialized", liffId);
  return liff; // return liff instance
};
