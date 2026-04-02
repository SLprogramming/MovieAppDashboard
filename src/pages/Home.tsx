import { useEffect } from "react"
import { useStoreSelector,useStoreDispatch } from "../store/store"

import { logout } from "../reducer/user.reducer";

import api from "../axios";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/myComponents/app-sidebar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle2, Bell } from "lucide-react";
import { toast } from "react-toastify";

const Home = () => {
const dispatch = useStoreDispatch()
  const {name,role} = useStoreSelector((state) => state.user)
 const handleLogout =async () => {
    let res = await api.get('auth/logout')
    if(res.data.success){
      toast.success('Successfully logged out',{autoClose:2000,position:"top-center"})
      dispatch(logout())
    }

  }
  useEffect(() => {
  if(role == 'user'){
    handleLogout()
  }
    
  },[role])

    if (!name) {
        return <Outlet />
    }
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden text-foreground font-sans">
        <AppSidebar />
        
        <div className="flex flex-col flex-1 w-full h-full overflow-hidden relative isolate">
            {/* Ambient Background for Outlet Area */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent -z-10 pointer-events-none" />
            
            {/* Top Header Navigation */}
            <header className="h-16 w-full flex items-center justify-between px-6 bg-card/80 backdrop-blur-xl border-b border-border z-10 sticky top-0 shrink-0">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
                    <div className="hidden md:flex items-center">
                        <div className="w-1 h-5 bg-primary rounded-full mr-3 shadow-sm"></div>
                        <h1 className="font-semibold text-lg tracking-tight text-foreground">Dashboard Overview</h1>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <button className="text-muted-foreground hover:text-foreground transition-colors relative group">
                        <Bell className="w-5 h-5 transition-all" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
                    </button>
                    
                    {name && (
                        <div className="flex items-center gap-3 pl-5 border-l border-border">
                            <div className="flex flex-col items-end hidden sm:flex">
                                <span className="text-sm font-semibold leading-none mb-1 tracking-tight">{name}</span>
                                <span className="text-[11px] text-primary-foreground font-bold tracking-wider uppercase bg-primary px-2 py-0.5 rounded-full">{role === 'admin' ? 'Administrator' : 'User'}</span>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-sm border-2 border-background cursor-pointer hover:shadow-md hover:scale-105 transition-all">
                                <UserCircle2 className="w-5 h-5" />
                            </div>
                        </div>
                    )}

                    {name && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleLogout} 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors rounded-full ml-1"
                            title="Log out"
                        >
                            <LogOut className="w-[18px] h-[18px]" />
                        </Button>
                    )}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto no-scrollbar p-6 md:p-8">
                <div className="mx-auto w-full max-w-[1600px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Outlet />
                </div>
            </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Home