import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "~/services/me";
import { AdvancedProfile } from "~/types/app";


interface MutationFn {
  variables: Partial<AdvancedProfile>;
}
export function useUpdateMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ variables }: MutationFn) =>
      updateMe(variables).then((response) => response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
        exact: true,
        refetchType: "active",
      });
    },
  });
}
