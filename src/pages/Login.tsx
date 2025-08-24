import { useEffect, useState } from "react";
import type { UserState } from "../reducer/user.reducer";
import { Button } from "@/components/ui/button";
import api from "../axios";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useStoreDispatch ,useStoreSelector} from "../store/store";
import { login, logout } from "../reducer/user.reducer";
import { toast } from "react-toastify";
// import React from 'react'


const Login = () => {
  const navigate = useNavigate();
  const storeDispatch = useStoreDispatch();
  const storeSelector = useStoreSelector(state => state.user)

  const handleLogout =async () => {
    let res = await api.get('auth/logout')
    if(res.data.success){
toast.success('successfully logout',{autoClose:2000,position:"top-center"})
      storeDispatch(logout())
    }

  }

  useEffect(() => {

    if(storeSelector.userId){
      navigate('/')
    }
  },[])




  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLogin = async () => {
    try {
      let payload = { email: emailInput, password: passwordInput };
      let res = await api.post("/auth/login", payload);
      if(res.data.user.role == "user"){
handleLogout()
       return toast.error('user account not allow to login',{position:"top-center",autoClose:2000})
      }
      if(res.data.success){

        let data :UserState= {
          name: res.data.user.name,
          email: res.data.user.email,
          premiumExpire: res.data.user.premiumExpire,
          role: res.data.user.role,
          userId:res.data.user._id
        } ;
        toast.success('login success',{autoClose:2000,position:"top-center"})
        storeDispatch(login(data));
        navigate("/");
      }
    } catch (error) {}
  };


  return (
    <>
      <div className="w-full  h-full">
        <div className="  w-100 bg-[var(--primary-color)] mt-10 font-bold text-[var(--lightGray-color)]  p-5 text-center mx-auto rounded-2xl">
          <h1 className="text-2xl text-[var(--secondary-color)]">Login </h1>
          <label
            htmlFor="email"
            className="block w-full text-left ps-1 mt-3 text-gray "
          >
            Email
          </label>
          <input
            id="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            type="text"
            className="bg-[var(--primary-foreground)] opacity-55 p-1 w-full rounded-3xl ps-3 focus:outline-[var(--secondary-foreground)] focus:ring-0"
          />
          <label
            htmlFor="password"
            className="block w-full text-left ps-1 mt-3 text-gray "
          >
            Password
          </label>
          <input
            id="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            type="text"
            className="bg-[var(--primary-foreground)] opacity-55 p-1 w-full rounded-3xl ps-3 focus:outline-[var(--secondary-foreground)] focus:ring-0"
          />
          <Button variant={"destructive"} className="mt-3" onClick={handleLogin}>
            login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
