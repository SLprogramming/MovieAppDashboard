// import React from 'react'
import { useEffect } from "react"
import { useUserSelector,useUserDispatch, type UserState } from "../store/user.store"
import { checkAuth } from "../reducer/user.reducer"
import Button from "../components/Button"




const Home = () => {
const userDispatch = useUserDispatch()
  const {name,email,premiumExpire,role} = useUserSelector((state) => state.user)

  useEffect(() => {
    console.log(name)
    
  },[name])
  return (
    <>
    <div>Home {name}</div>
    <Button buttonType="primary" onClick={() => userDispatch(checkAuth())}>fetch</Button>
    </>
  )
}

export default Home