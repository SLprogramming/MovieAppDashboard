import type { ColumnDef } from "@tanstack/react-table"
import type { SubscriptionPlan } from "./UserColumn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {  buttonVariants } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"

 

export const getPlanColumn = (handleDeletePlan:(id:string) => void, setSelectedIdToEdit : (id:string) => void,selectedIdToEdit:string)  => {
     const columns: ColumnDef<SubscriptionPlan>[] = [
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
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "durationDays",
    header: "Days",
    cell:({row}) => {
      let days : number = row.getValue('durationDays')
      return <div>{days}</div>
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    cell:({row}) => {
        let description = row.getValue('description') as string 
        return (<div>{description || '-'}</div>)
    }
  },
  {
    accessorKey: "isActive",
    header: "Active Status",
  },
  {
    accessorKey: "_id",
    header: "Actions",
    cell:({row}) => {
      const planId = row.getValue("_id") as string
        return (
            <DropdownMenu>
  <DropdownMenuTrigger >
    <div className={buttonVariants({variant:selectedIdToEdit == planId ? "default" : "outline"})}>

          <Ellipsis className="h-4 w-4" />
    </div>
        </DropdownMenuTrigger>
  <DropdownMenuContent>
   
    <DropdownMenuItem onClick={() => handleDeletePlan(planId)}>Delete</DropdownMenuItem>
    <DropdownMenuItem onClick={() => setSelectedIdToEdit(planId)}>Edit</DropdownMenuItem>
    <DropdownMenuItem>Deactivate</DropdownMenuItem>
    
  </DropdownMenuContent>
</DropdownMenu>
        )
    }
  },
]

return columns
}