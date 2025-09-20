import React, { useEffect, useMemo, useState } from 'react'
import { useStoreDispatch, useStoreSelector } from "@/store/store";
import { fetchAllPurchase,changePurchaseStatus } from '@/reducer/purchase.reducer';
import { DataTable } from '@/myComponents/data-table';
import { getPurchaseColumn } from '@/myComponents/dataColumn/PurchaseRequestColumn';
const PurchaseRequest = () => {
   const dispatch = useStoreDispatch();
   const {purchaseHistory} = useStoreSelector(state => state.purchase)
   const [selectedStatus,setSelectedStatus] = useState<'pending' | 'approved' | 'rejected'>('pending')
  useEffect(() => {
    dispatch(fetchAllPurchase())
  },[])

  const filterHistory = useMemo(() => {
    let pending = purchaseHistory.filter(e => e.status == 'pending')
    let approved = purchaseHistory.filter(e=> e.status == 'approved')
    let rejected = purchaseHistory.filter(e=> e.status == 'rejected')
    let obj =  {pending,approved,rejected}
    return obj[selectedStatus]
  },[purchaseHistory,selectedStatus])
  const handleChangeStatus = (payload:{id:string,status:"pending"| "approved" | "rejected"}) => dispatch(changePurchaseStatus(payload))
  const dataColumn = getPurchaseColumn(handleChangeStatus)
  return (
    <div>
      <h1>Purchase Request</h1>
      <div>
        <DataTable columns={dataColumn} data={[...filterHistory].reverse()}></DataTable>
      </div>
    </div>
  )
}

export default PurchaseRequest