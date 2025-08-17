// store/counterSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../axios";
// import { build } from "vite";


export type UserState = {
  name: string;
  email: string;
  premiumExpire: string;
  role: string;
  // token:string,
  userId:string,

};

const initialState: UserState = {
  name: "",
  email: "",
  premiumExpire: "",
  role: "",
  // token:"",
  userId:""
 
};


// ✅ Async thunk to check auth
export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return initialState;

    // call API with userId
    const response = await api.get(`auth/info`);
    console.log(response.data)
    return response.data; // must match UserState shape
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // increment(state) {
    //   state.value += 1;
    // },
    // decrement(state) {
    //   state.value -= 1;
    // },
    // incrementByAmount(state, action: PayloadAction<number>) {
    //   state.value += action.payload;
    // },
    login(_, action: PayloadAction<UserState>) {
      localStorage.setItem('userId',action.payload.userId)
      return action.payload;  
    },
    logout() {
      localStorage.removeItem('userId')
      return initialState
    },
   
  },
  extraReducers:(builder) => {
      builder.addCase(checkAuth.fulfilled,(_,action) => {
        console.log(action.payload)
      })
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
