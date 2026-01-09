// import { useState } from 'react'
import { Suspense, useEffect } from "react";
import { routes } from "./route.tsx";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { useStoreDispatch, useStoreSelector } from "./store/store.ts";
import { checkAuth } from "./reducer/user.reducer.ts";
import Loading from "./pages/Loading.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAdminSocket, useMessageSocket } from "./socket.tsx";
import { fetchAllPurchase } from "./reducer/purchase.reducer.ts";

function App() {
  const { userId } = useStoreSelector((state) => state.user);

  const dispatch = useStoreDispatch();

  const newRequestPurchase = () => {
    dispatch(fetchAllPurchase());
  };
  useAdminSocket(newRequestPurchase);

  useMessageSocket(userId);
  // useEffect(() => {
  // }, [userId]);
  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchAllPurchase());
  }, [dispatch]);
  function AppRoutes() {
    return useRoutes(routes);
  }

  return (
    <>
      <div className="">
        <ToastContainer />
        <BrowserRouter>
          <Suspense fallback={<Loading></Loading>}>
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
