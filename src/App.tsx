// import { useState } from 'react'
import { Suspense, useEffect } from "react";
import {routes} from "./route.tsx"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { useStoreDispatch } from "./store/store.ts";
import { checkAuth } from "./reducer/user.reducer.ts";
import Loading from "./pages/Loading.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAdminSocket } from "./socket.tsx";
import { fetchAllPurchase } from "./reducer/purchase.reducer.ts";



function App() {
  const dispatch = useStoreDispatch()
 
  const newRequestPurchase = () => {
    dispatch(fetchAllPurchase())
  }
useAdminSocket(newRequestPurchase)
  useEffect(() => {
    dispatch(checkAuth())
    dispatch(fetchAllPurchase())
  },[dispatch])
  function AppRoutes() {
  return useRoutes(routes);
}

  return (
    <>
    <div  className="">
    <ToastContainer/>
      <BrowserRouter>
      <Suspense fallback={<Loading></Loading>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
