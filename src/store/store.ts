// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/user.reducer.ts";
import planReducer from "../reducer/plan.reducer.ts"

import {type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const userStore = configureStore({
  reducer: {
    user: userReducer,
    plan:planReducer
  },
});

// Types for useSelector and useDispatch
export type UserState = ReturnType<typeof userStore.getState>;
export type UserDispatch = typeof userStore.dispatch;

export const useStoreDispatch: () => UserDispatch = useDispatch;
export const useStoreSelector: TypedUseSelectorHook<UserState> = useSelector;
