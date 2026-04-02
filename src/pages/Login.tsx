import { useEffect, useState } from "react";
import type { UserState } from "../reducer/user.reducer";
import { Button } from "@/components/ui/button";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import { useStoreDispatch, useStoreSelector } from "../store/store";
import { login, logout } from "../reducer/user.reducer";
import { toast } from "react-toastify";
import { Film, Mail, Lock, LogIn, ShieldAlert } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const storeDispatch = useStoreDispatch();
  const storeSelector = useStoreSelector(state => state.user);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    let res = await api.get('auth/logout');
    if (res.data.success) {
      toast.success('Successfully logged out', { autoClose: 2000, position: "top-center" });
      storeDispatch(logout());
    }
  };

  useEffect(() => {
    if (storeSelector.userId) {
      navigate('/');
    }
  }, [storeSelector.userId, navigate]);

  const handleLogin = async (e?: React.FormEvent) => {
    if(e) e.preventDefault();
    if(!emailInput || !passwordInput) {
       return toast.warning("Please fill in all fields", { position: "top-center", autoClose: 2000 });
    }
    
    setIsLoading(true);
    try {
      let payload = { email: emailInput, password: passwordInput };
      let res = await api.post("/auth/login", payload);
      
      if (res.data.user.role === "user") {
        handleLogout();
        setIsLoading(false);
        return toast.error('Standard user accounts are not permitted to access the dashboard.', { position: "top-center", autoClose: 3000 });
      }
      
      if (res.data.success) {
        let data: UserState = {
          name: res.data.user.name,
          email: res.data.user.email,
          premiumExpire: res.data.user.premiumExpire,
          role: res.data.user.role,
          userId: res.data.user._id
        };
        toast.success('Authentication successful', { autoClose: 2000, position: "top-center" });
        storeDispatch(login(data));
        navigate("/");
      }
    } catch (error) {
       toast.error('Authentication failed. Please check your credentials.', { position: "top-center", autoClose: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full min-h-[100dvh] flex items-center justify-center bg-background p-4 font-sans text-foreground overflow-hidden relative'>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[0%] left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className='relative z-10 w-full max-w-md'>
        
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 backdrop-blur-sm">
                <Film className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-wider text-foreground mb-2">
                CINE<span className="text-primary">ADMIN</span>
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Dashboard Access Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-card/90 backdrop-blur-xl border border-border shadow-xl rounded-3xl p-8 relative overflow-hidden">
            {/* Inner Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[40px] pointer-events-none"></div>

            <div className="mb-8 border-b border-border pb-6">
                <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-primary" />
                    Secure Login
                </h2>
                <p className="text-muted-foreground text-sm mt-1">Authorized personnel only.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground ml-1">
                        Admin Email
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            id="email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            type="email"
                            placeholder="admin@cine.com"
                            className="w-full bg-background border border-input text-foreground rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-ring focus:border-border transition-all placeholder:text-muted-foreground"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2 mb-8">
                    <div className="flex justify-between items-center ml-1">
                        <label htmlFor="password" className="block text-sm font-medium text-foreground">
                            Access Key
                        </label>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            id="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-background border border-input text-foreground rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-ring focus:border-border transition-all placeholder:text-muted-foreground tracking-widest"
                            required
                        />
                    </div>
                </div>

                <Button 
                    type="submit"
                    variant="default" 
                    className="w-full text-base font-bold py-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                    disabled={isLoading}
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    ) : (
                        <>
                            Authenticate
                            <LogIn className="w-5 h-5 ml-1 opacity-80" />
                        </>
                    )}
                </Button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
