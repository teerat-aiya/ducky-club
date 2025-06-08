import api from "./api";
import { AuthState, SignInCredential } from "~/types/auth";

export const login = (args: SignInCredential) =>
  api.post<AuthState>("/auth/login", args);

export const refreshTokenApi = async (refreshToken: string) =>
  api
    .post<AuthState>(
      "/auth/refresh",
      {},
      {
        headers: {
          "Refresh-Token": refreshToken,
        },
      }
    )
    .then((response) => response.data);

// export const logoutApi = () =>
//   api.post(
//     "/auth/logout",
//     {},
//     {
//       headers: {
//         "Refresh-Token": `${store.getState().auth.refreshToken}`,
//       },
//     }
//   );

// export const signUp = (data: SignUpCredential) =>
//   api.post<{ id?: string }>("/auth/signup", data);

// export const verifyEmail = (token: string) =>
//   api.post("/auth/verify-email", { token });

// export const resetPassword = (token: string, password: string) =>
//   api.post("/auth/reset-password", { token, password });

// export const resetPasswordRequest = (email: string) =>
//   api.post("/auth/reset-password-request", { email });
