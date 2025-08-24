// store/counterSlice.ts
import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../axios";

// import { build } from "vite";



export interface PaymentMethod {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
  __v: number;
}

type InitialStateType = {
    paymentTypes:PaymentMethod[]
}


const initialState :InitialStateType  = {
  paymentTypes:[]
 
};

export const fetchPaymentTypes = createAsyncThunk("payment/fetchPaymentTypes", async (_, { getState, rejectWithValue }) => {
const state: any = getState();

 try {
      // 🔥 Only call API if no data in state
      const response = await api.get("payment/get-all");
     
      return response.data.data;
    } catch (err) {
      return rejectWithValue("Auth check failed");
    }

})

export const createPaymentTypes = createAsyncThunk("payment/createPaymentTypes",async (name : string,{getState,rejectWithValue}) => {
    const state: any = getState();

    try {
        const res = await api.post('payment/create',{name})
       
        if(res.data.success){

            return res.data.data
        }
    } catch (error) {
        
    }
})

export const deleteType = createAsyncThunk("payment/deleteType",async (id:string,{getState,rejectWithValue}) => {
    const state : any = getState();

    try {
        const res = await api.delete('payment/delete/'+id)
        if(res.data.success) {
            return id
        }
    } catch (error) {
        
    }
})



const PaymentTypeSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentTypes(state,action:PayloadAction<PaymentMethod[]>){
        state.paymentTypes = action.payload
    },
    addPaymentType(state,action:PayloadAction<PaymentMethod>){
        state.paymentTypes.push(action.payload)
    },
    deletePaymentType(state,action:PayloadAction<string>){
        state.paymentTypes = state.paymentTypes.filter(e=> e._id != action.payload)
    },
    updatePaymentType(state,action:PayloadAction<PaymentMethod>){
        state.paymentTypes = state.paymentTypes.map(e=> e._id == action.payload._id ? action.payload : e)
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
    builder.addCase(fetchPaymentTypes.fulfilled,(state,action) => {
        state.paymentTypes = action.payload
    })
    builder.addCase(createPaymentTypes.fulfilled,(state,action) => {
        state.paymentTypes.push(action.payload)
    })
    builder.addCase(deleteType.fulfilled,(state,action) => {
      state.paymentTypes =  state.paymentTypes.filter(e => e._id != action.payload)
    })
  }

});

export const { setPaymentTypes,addPaymentType,deletePaymentType,updatePaymentType } = PaymentTypeSlice.actions;
export default PaymentTypeSlice.reducer;
