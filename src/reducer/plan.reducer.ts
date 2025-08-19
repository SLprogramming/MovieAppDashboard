// store/counterSlice.ts
import {  createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../axios";
import type { SubscriptionPlan } from "@/myComponents/dataColumn/UserColumn";
// import { build } from "vite";



type InitialType = {
    plans:SubscriptionPlan[]
}

const initialState :InitialType = {
  plans:[]
 
};





const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlans(state,action:PayloadAction<SubscriptionPlan[]>){
        state.plans = action.payload
    },
    addPlan(state,action:PayloadAction<SubscriptionPlan>){
        state.plans.push(action.payload)
    },
    deletePlan(state,action:PayloadAction<string>){
        state.plans = state.plans.filter(e=> e._id != action.payload)
    },
    updatePlan(state,action:PayloadAction<SubscriptionPlan>){
        state.plans = state.plans.map(e=> e._id == action.payload._id ? action.payload : e)
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

});

export const { setPlans,addPlan,deletePlan,updatePlan } = planSlice.actions;
export default planSlice.reducer;
