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
  async (_, { getState, rejectWithValue }) => {
    const state: any = getState(); // type properly if you have RootState

    // check if user already exists in state
    if (state.user?.userId) {
      console.log("Already have user in state:", state.user);
      return state.user; // return existing data, skip API
    }

    // // fallback check: localStorage
    // const userId = localStorage.getItem("userId");
    // if (!userId) {
    //   console.log("No userId found, returning initial state");
    //   return rejectWithValue("No userId");
    // }

    try {
      // 🔥 Only call API if no data in state
      const response = await api.get("auth/info");
      return response.data;
    } catch (err) {
      return rejectWithValue("Auth check failed");
    }
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
      // localStorage.setItem('userId',action.payload.userId)
      return action.payload;  
    },
    logout() {
      // localStorage.removeItem('userId')
      return initialState
    },
   
  },
  extraReducers:(builder) => {
      builder.addCase(checkAuth.fulfilled,(_,action) => {
        let data = {
          name: action.payload?.user?.name,
          email: action.payload?.user?.email,
          premiumExpire: action.payload?.user?.premiumExpire,
          role: action.payload?.user?.role,
          userId:action.payload?.user?._id
        }
        return data
      })
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
