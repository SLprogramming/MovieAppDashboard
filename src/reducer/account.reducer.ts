// store/counterSlice.ts
import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../axios";

// import { build } from "vite";



export interface BankAccount {
  _id: string;
  name: string;
  isActive: boolean;
  accNumber: string;
  paymentType_id: {
    _id: string;
    name: string;
  };
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
  __v: number;
}


type InitialStateType = {
    accounts:BankAccount[]
}


const initialState :InitialStateType  = {
  accounts:[]
 
};

export const fetchAllAccount = createAsyncThunk("accounts/fetchAllAccount", async (_, { getState, rejectWithValue }) => {
const state: any = getState();

 try {
      // 🔥 Only call API if no data in state
      const response = await api.get("bankAccount/get-all");
    
      return response.data.data;
    } catch (err) {
      return rejectWithValue("Auth check failed");
    }

})



const AccountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccounts(state,action:PayloadAction<BankAccount[]>){
        state.accounts = action.payload
    },
    addAccounts(state,action:PayloadAction<BankAccount>){
       
        state.accounts.push(action.payload)
    },
    deleteAccount(state,action:PayloadAction<string>){
        state.accounts = state.accounts.filter(e=> e._id != action.payload)
    },
    updateAccount(state,action:PayloadAction<BankAccount>){
        state.accounts = state.accounts.map(e=> e._id == action.payload._id ? action.payload : e)
    }
    // increment(state) {
    //   state.value += 1;
    // },
    // decrement(state) {
    //   state.value -= 1;
    // },
    // incrementByAmount(state, action: PayloadAction<number>) {
    //   state.value += action.payload;
    // },
 
   
  },
  extraReducers:(builder) => {
    builder.addCase(fetchAllAccount.fulfilled,(state,action) => {
        state.accounts = action.payload
    })
  }

});

export const { setAccounts,addAccounts,deleteAccount,updateAccount } = AccountSlice.actions;
export default AccountSlice.reducer;
