import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Index = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full flex'>

        <img className='w-[60%]' src="/public/login.gif" alt="" />
        <div className='h-[500px] flex items-center'>
            <h2 className='font-bold text-3xl me-2'>Please</h2>
            <Button variant={'primary'}  size={'lg'} className='font-bold' onClick={() => navigate('/login') }>Login</Button>
        </div>
    </div>
  )
}

export default Index