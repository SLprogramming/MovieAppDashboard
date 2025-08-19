import api from '@/axios'
import { DataTable } from '@/myComponents/data-table';
import { addPlan, setPlans } from '@/reducer/plan.reducer';
import { useStoreDispatch, useStoreSelector } from '@/store/store';
import React, { useEffect, useState } from 'react'
import type {SubscriptionPlan} from "@/reducer/user.reducer.tsx"
import { getPlanColumn } from '@/myComponents/dataColumn/PlanColumn';


const Plans = () => {
  const {plans} = useStoreSelector(state => state.plan)
  const planColumn = getPlanColumn()
  const dispatch = useStoreDispatch()
  const getPlans = async () => {
    try {
      let res = await api.get('plan/get-all')
      console.log(res.data.data)
      dispatch(setPlans(res.data.data))
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getPlans()
  },[])

  return (
    <div className='w-full flex'>
      <div className='w-2/3 '>
        <h2 className='font-bold ps-1 mb-1'>All Plans</h2>
      <DataTable columns={planColumn} data={plans}></DataTable>
      </div>
      <div className='w-1/3 px-3'>
        
      </div>
    </div>
  )
}

export default Plans