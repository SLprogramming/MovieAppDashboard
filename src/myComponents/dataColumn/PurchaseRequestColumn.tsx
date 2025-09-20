import type { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import type {
  PaymentAccount,
  PurchaseRequest,
} from "@/reducer/purchase.reducer";
import type { SubscriptionPlan } from "./UserColumn";



export const getPurchaseColumn = (changeStatus:({id,status}:{id:string,status:"pending"| "approved" | "rejected"}) => void) => {
  const columns: ColumnDef<PurchaseRequest>[] = [
    {
      id: "serial",
      header: "#",
      cell: ({ row }) => row.index + 1, // serial number starts at 1
    },
    {
      accessorKey: "img",
      header: "img",
      cell: ({ row }) => {
        let img: any = row.getValue("img");
        return (
          <div className="w-[50px] h-[80px]">
            <img className="w-full h-full" src={img.url} />
          </div>
        );
      },
    },
    {
      accessorKey: "transitionNumber",
      header: "Transition Number",
    },
    {
      accessorKey: "plan_id",
      header: "Platform",
      cell: ({ row }) => {
        let plan: SubscriptionPlan = row.getValue("plan_id");
        return <div>{plan.name}</div>;
      },
    },
    {
      accessorKey: "bankAccount_id",
      header: "Account",
      cell: ({ row }) => {
        let account: PaymentAccount = row.getValue("bankAccount_id");
        return <div>{account?.name || ""}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },

    {
      accessorKey: "_id",
      header: "Actions",
      cell: ({ row }) => {
        const purchase = row.getValue("_id") as string;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div>
                <Ellipsis className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => changeStatus({id:purchase,status:'approved'})}>Approve</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeStatus({id:purchase,status:'rejected'})}>Reject</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
