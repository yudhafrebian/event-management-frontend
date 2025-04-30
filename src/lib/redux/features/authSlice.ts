import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  id: string;
  first_name: string;
  last_name: string;
  profile_img: string;
  email: string;
  password?: string;
  is_verified: boolean;
  role: string;
  code: string;
  points: number;
}

const initialState: IAuth = {
  id: "",
  first_name: "",
  last_name: "",
  profile_img: "",
  email: "",
  password: "",
  is_verified: false,
  role: "user",
  code: "",
  points: 0,
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
