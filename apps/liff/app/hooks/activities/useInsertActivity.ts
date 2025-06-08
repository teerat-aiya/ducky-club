import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertActivity } from "~/services/activity";
import { Activity } from "~/types/app";

interface MutationFn {
    variables: Activity;
  }
  
  export const useInsertActivity = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ variables }: MutationFn) =>
        insertActivity(variables).then((response) => response.data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["activities"],
          exact: true,
          refetchType: "active",
        });
      },
    });
  };