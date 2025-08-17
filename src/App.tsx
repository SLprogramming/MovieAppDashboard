// import { useState } from 'react'
import { Suspense, useEffect } from "react";
import {routes} from "./route.tsx"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { useUserDispatch } from "./store/user.store.ts";
import { checkAuth } from "./reducer/user.reducer.ts";


function App() {
const userDispatch = useUserDispatch()

useEffect(() => {
  userDispatch(checkAuth())
},[userDispatch])
  function AppRoutes() {
  return useRoutes(routes);
}

  return (
    <>
      <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App
