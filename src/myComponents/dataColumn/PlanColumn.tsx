import type { ColumnDef } from "@tanstack/react-table"
import type { SubscriptionPlan } from "./UserColumn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"



export const getPlanColumn = () => {
     const columns: ColumnDef<SubscriptionPlan>[] = [
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
        return (
            <DropdownMenu>
  <DropdownMenuTrigger ><Button variant="outline" size="icon">
          <Ellipsis className="h-4 w-4" />
        </Button></DropdownMenuTrigger>
  <DropdownMenuContent>
   
    <DropdownMenuItem>Delete</DropdownMenuItem>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Deactivate</DropdownMenuItem>
    
  </DropdownMenuContent>
</DropdownMenu>
        )
    }
  },
]

return columns
}