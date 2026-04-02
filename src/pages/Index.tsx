import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Film, UserCircle, PlayCircle, ShieldCheck } from 'lucide-react'

const Index = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full min-h-[100dvh] flex items-center justify-center bg-background p-4 font-sans text-foreground overflow-hidden relative'>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className='relative z-10 w-full max-w-6xl rounded-[2rem] bg-card/80 backdrop-blur-md border border-border shadow-lg overflow-hidden flex flex-col md:flex-row'>
        
        {/* Left column: Visuals */}
        <div className='w-full md:w-1/2 p-10 flex flex-col justify-between relative bg-muted/30'>
            <div className="flex items-center gap-2 mb-12">
               <Film className="w-8 h-8 text-primary" />
               <h1 className="text-2xl font-bold tracking-wider text-foreground">
                  CINE<span className="text-primary">ADMIN</span>
               </h1>
            </div>

            <div className="mb-10 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary/80">
                Manage your streaming empire
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto md:mx-0 font-medium">
                The centralized hub for controlling content, users, and analytics across all your platforms.
              </p>
            </div>

            <div className="hidden md:flex flex-col gap-4 text-sm text-foreground/80">
              <div className="flex items-center gap-4 transition-transform hover:translate-x-2 duration-300">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <PlayCircle className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold tracking-wide">Content Management System</span>
              </div>
              <div className="flex items-center gap-4 transition-transform hover:translate-x-2 duration-300 delay-75">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <UserCircle className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold tracking-wide">User Analytics & Tracking</span>
              </div>
               <div className="flex items-center gap-4 transition-transform hover:translate-x-2 duration-300 delay-150">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold tracking-wide">Advanced Security & Roles</span>
              </div>
            </div>
        </div>

        {/* Right column: Action */}
        <div className='w-full md:w-1/2 p-10 lg:p-16 flex flex-col items-center justify-center bg-card shadow-[-20px_0_50px_rgba(0,0,0,0.05)] z-10'>
            <div className="w-full max-w-sm flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-8 rounded-full bg-muted flex items-center justify-center shadow-inner border border-border">
                    <UserCircle className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className='font-bold text-3xl mb-2 text-foreground tracking-tight'>Welcome Back</h3>
                <p className="text-muted-foreground mb-10 font-medium">Please sign in to your administrator account to continue.</p>
                
                <Button 
                    className='w-full text-base font-bold py-7 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300 scale-100 hover:scale-[1.02]' 
                    onClick={() => navigate('/login') }
                >
                    Proceed to Login
                </Button>
                
                <p className="mt-10 text-xs text-muted-foreground font-medium tracking-wide pt-6 border-t border-border w-full text-center">
                  © {new Date().getFullYear()} CineAdmin Dashboard. All rights reserved.
                </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Index