import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch, RootState } from "..";
import { refreshTokenApi } from "~/services/auth";
import { AuthState } from "~/types/auth";

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  expiresAt: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.expiresAt = action.payload.expiresAt
        ? Number(action.payload.expiresAt)
        : null;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.expiresAt = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const renewToken = (): AppThunk => async (dispatch, getState) => {
  const state = getState().auth;
  if (state.refreshToken && state.expiresAt) {
    const now = Date.now();
    const expiresAt = new Date(state.expiresAt).getTime();
    const timeUntilExpiry = expiresAt - now;

    // Only refresh if the token expires in less than 5 minutes
    if (timeUntilExpiry < 300000) {
      try {
        const response = await refreshTokenApi(state.refreshToken);
        console.log("Token renewed:", response);
        dispatch(setCredentials(response));
        scheduleTokenRenewal(dispatch, response.expiresAt as number);
      } catch (error) {
        console.error("Failed to renew token:", error);
        dispatch(logout());
      }
    } else {
      console.log("Token is not close to expiry. No need to refresh yet.");
      // Reschedule the renewal
      scheduleTokenRenewal(dispatch, expiresAt);
    }
  }
};

export const scheduleTokenRenewal = (
  dispatch: AppDispatch,
  expiresAt: number
) => {
  const expiresAtDate = new Date(expiresAt).getTime();
  const now = Date.now();
  const timeUntilExpiry = expiresAtDate - now;
  const renewalTime = Math.max(timeUntilExpiry - 300000, 0); // Renew 5 minutes before expiry or immediately if less than 5 minutes left

  setTimeout(() => {
    console.log("Checking token for renewal...");
    dispatch(renewToken());
  }, renewalTime);
};
export default authSlice.reducer;
