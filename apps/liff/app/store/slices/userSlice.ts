import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserState {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

const initialState: UserState = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  avatar: "", 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        avatar: string;
      }>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.avatar = action.payload.avatar;
    }
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
