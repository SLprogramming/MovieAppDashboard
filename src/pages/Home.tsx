// import React from 'react'
import { useEffect } from "react"
import { useStoreSelector,useStoreDispatch } from "../store/store"

import { logout } from "../reducer/user.reducer";

import api from "../axios";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/myComponents/app-sidebar";
import { Outlet } from "react-router-dom";




const Home = () => {
const dispatch = useStoreDispatch()
  const {name} = useStoreSelector((state) => state.user)
  const handleLogout =async () => {
    let res = await api.get('auth/logout')
    console.log(res)
    dispatch(logout())

  }
  useEffect(() => {
    console.log(name)
    
  },[name])
  return (
    <>
    
    <SidebarProvider>
      <AppSidebar />
     
     <div className="container w-full h-full">

        <div className="flex w-full justify-start gap-4 pt-3 mb-3">
        <SidebarTrigger />

       
    <div>hello</div>
        </div>
        <div className="min-w-full min-h-[800px] no-scrollbar overflow-y-scroll  rounded-2xl p-5">
          <Outlet></Outlet>
        </div>
     </div>
        
     
    </SidebarProvider>
    </>
  )
}

export default Home