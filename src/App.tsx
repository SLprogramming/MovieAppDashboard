// import { useState } from 'react'
import { Suspense, useEffect } from "react";
import {routes} from "./route.tsx"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { useStoreDispatch } from "./store/store.ts";
import { checkAuth } from "./reducer/user.reducer.ts";
import Loading from "./pages/Loading.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {

const dispatch = useStoreDispatch()
  useEffect(() => {
    dispatch(checkAuth())
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
