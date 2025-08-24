import type { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {deleteAccount, type BankAccount} from "@/reducer/account.reducer"
import { Ellipsis, ShieldAlert, ShieldCheck } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { useStoreDispatch } from "@/store/store"
import api from "@/axios"



export const getAccountColumn = (handleUpdate:(id:string,active:boolean) => void , accountIdToEdit :string)  => {
  let dispatch = useStoreDispatch()
  const handleDeleteAccount = async (id :string) => {
    try {
      let res =await api.delete("bankAccount/delete/"+id)
        if(res.data.success){
          dispatch(deleteAccount(id))
        }
    } catch (error) {
      
    }
  }
     const columns: ColumnDef<BankAccount>[] = [
        {
    id: "serial",
    header: "#",
    cell: ({ row }) => row.index + 1, // serial number starts at 1
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "accNumber",
    header: "Account Number",
  },
  {
    accessorKey: "paymentType_id",
    header: "Type",
    cell:({row}) => {
        const paymentType = row.getValue("paymentType_id") as  {
    _id: string;
    name: string;
  }

        return (<div>{paymentType.name}</div>)
    }
  },
  {
    accessorKey:"isActive",
    header:"Status",
    cell:({row}) => {
        const status = row.getValue("isActive") as boolean
        if(status){
            return (<div className="bg-green-400 p-2 rounded-2xl inline-block scale-75"><ShieldCheck /></div>)
        }else{
            return (<div className="bg-yellow-400 p-2 rounded-2xl inline-block scale-75"><ShieldAlert /></div>)
        }
    }
  },
  {
    accessorKey:"_id",
    header:"Actions",
    cell:({row}) => {
      const id = row.getValue("_id") as string
      const isActive = row.getValue("isActive") as boolean
      return (
        <DropdownMenu>
  <DropdownMenuTrigger> <div className={buttonVariants({variant: accountIdToEdit == id ? "primary" :"outline"})}>

          <Ellipsis className="h-4 w-4" />
    </div></DropdownMenuTrigger>
  <DropdownMenuContent>
    
    <DropdownMenuItem onClick={() => handleUpdate(id,false)}>update</DropdownMenuItem>
    <DropdownMenuItem onClick={() => handleDeleteAccount(id)}>delete</DropdownMenuItem>
    <DropdownMenuItem onClick={() => handleUpdate(id,true)}>{isActive ? "Deactivate" : "Activate"}</DropdownMenuItem>
    
  </DropdownMenuContent>
</DropdownMenu>
      )
    }
  }

]

return columns
}