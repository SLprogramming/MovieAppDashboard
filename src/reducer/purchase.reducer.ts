// store/counterSlice.ts
import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SubscriptionPlan, User } from "@/myComponents/dataColumn/UserColumn";
import api from "../axios";
import type { PaymentMethod } from "./payment.reducer";

// import { build } from "vite";



type Image = {
  url: string;
  public_id: string;
};

export interface PaymentAccount {
  _id: string;
  name: string;
  isActive: boolean;
  accNumber: string;
  paymentType_id: PaymentMethod;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
  __v: number;
}

export type PurchaseRequest = {
  _id: string;
  user_id: User;
  plan_id: SubscriptionPlan;
  bankAccount_id?: PaymentAccount ; // if populated, make another type for BankAccount
  img: Image;
  status: "pending" | "approved" | "rejected";
  transitionNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type InitialStateType = {
    purchaseHistory:PurchaseRequest[]
}


const initialState :InitialStateType  = {
  purchaseHistory:[],

 
};


export const fetchAllPurchase = createAsyncThunk("purchase/fetchAllPurchase", async (_, { getState, rejectWithValue }) => {
const state: any = getState();

 try {
      // 🔥 Only call API if no data in state
      const response = await api.get("purchase/get-all");
    
      return response.data.data;
    } catch (err) {
      return rejectWithValue("Auth check failed");
    }

})
export const changePurchaseStatus = createAsyncThunk("purchase/changePurchaseStatus", async (payload:{id:string,status:"pending"| "approved" | "rejected"}, { getState, rejectWithValue }) => {
const state: any = getState();
console.log(payload)
 try {
      // 🔥 Only call API if no data in state
      const response = await api.put("purchase/update/"+payload.id,{status:payload.status});
      if(response.data.success){
        console.log(payload)
        return payload;
      }else{
        return {id:payload.id ,status:(state.purchaseHistory.find({_id:payload.id}).status || 'pending')}
      }
      
    } catch (err) {
      return rejectWithValue("Auth check failed");
    }

})



const PurchaseHistorySlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setPurchaseHistory(state,action:PayloadAction<PurchaseRequest[]>){
        state.purchaseHistory = action.payload
    },
    addPurchaseRequest(state,action:PayloadAction<PurchaseRequest>){
        state.purchaseHistory.push(action.payload)
    },
    deletePurchaseRequest(state,action:PayloadAction<string>){
        state.purchaseHistory = state.purchaseHistory.filter(e=> e._id != action.payload)
    },
    updatePurchaseRequest(state,action:PayloadAction<PurchaseRequest>){
        state.purchaseHistory = state.purchaseHistory.map(e=> e._id == action.payload._id ? action.payload : e)
    },
    changeStatus(state,action:PayloadAction<{id:string,status:"pending"| "approved" | "rejected"}>){
        state.purchaseHistory = state.purchaseHistory.map(e => e._id == action.payload.id ? {...e,state:action.payload.status}:e)
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
    builder.addCase(fetchAllPurchase.fulfilled,(state,action) => {
        state.purchaseHistory = action.payload
    })
    builder.addCase(changePurchaseStatus.fulfilled,(state,action) => {
        state.purchaseHistory = state.purchaseHistory.map(e => e._id == action.payload.id ? {...e,status:action.payload.status}:e)
    })
  }

});

export const { setPurchaseHistory,addPurchaseRequest,deletePurchaseRequest,updatePurchaseRequest } = PurchaseHistorySlice.actions;
export default PurchaseHistorySlice.reducer;
