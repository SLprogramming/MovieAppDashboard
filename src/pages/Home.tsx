// import React from 'react'
import { useEffect } from "react"
import { useStoreSelector,useStoreDispatch } from "../store/store"

import { logout } from "../reducer/user.reducer";

import api from "../axios";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/myComponents/app-sidebar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";




const Home = () => {
const dispatch = useStoreDispatch()
  const {name} = useStoreSelector((state) => state.user)
 const handleLogout =async () => {
    let res = await api.get('auth/logout')
    if(res.data.success){
      toast.success('successfully logout',{autoClose:2000,position:"top-center"})
      dispatch(logout())
    }

  }
  useEffect(() => {
  
    
  },[name])
  return (
    <>
    
    <SidebarProvider>
      <AppSidebar />
     
     <div className="container w-full h-full">

        <div className="flex w-full justify-start items-center gap-4 pt-3 mb-3 relative">
          {name && (<Button variant={"default"} size={"icon"} onClick={handleLogout} className="absolute right-0"><LogOut /></Button>)}
        <SidebarTrigger className="scale-140" />

       
    {name &&(<div className="font-bold border border-black ps-4 py-[6px] rounded-2xl ">hello <span className="bg-primary text-primary-foreground  px-4 py-2 rounded-2xl">{name}</span></div>)}
        </div>
        <div className="min-w-full  no-scrollbar overflow-y-scroll  rounded-2xl p-5">
          <Outlet></Outlet>
        </div>
     </div>
        
     
    </SidebarProvider>
    </>
  )
}

export default Home