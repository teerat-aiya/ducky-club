import { useMutation, useQueryClient } from "@tanstack/react-query";
import { store } from "~/store";
import { login } from "~/services/auth";
import { AuthState, SignInCredential } from "~/types/auth";
import { setCredentials } from "~/store/slices/authSlice";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credential: SignInCredential) =>
      login(credential).then((response) => response.data),
    onSuccess: (data: AuthState) => {
      store.dispatch(setCredentials(data));
      // scheduleTokenRenewal(store.dispatch, Number(data.expiresAt));

      queryClient.invalidateQueries({
        queryKey: ["me"],
        exact: true,
        refetchType: "active",
      });
    },
  });
};
