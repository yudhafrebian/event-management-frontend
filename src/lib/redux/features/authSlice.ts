import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: boolean;
  role: string;
}

const initialState: IAuth = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  is_verified: false,
  role: "user",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      console.log("Check Action Section", action);
      console.log(state);

      return action.payload;
    },
    setSignOut: (state) => {
      console.log(state);
      return initialState;
    },
  },
});

export const { setSignIn, setSignOut } = authSlice.actions;
export default authSlice.reducer;
