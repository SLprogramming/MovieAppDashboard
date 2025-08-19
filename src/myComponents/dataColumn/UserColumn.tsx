import type { ColumnDef } from '@tanstack/react-table';
import { Crown, ShieldAlert } from 'lucide-react';
import UserRowActions from './user-row-actions';



export type User = {
  _id: string;
  name: string;
  email: string;
  role: "superAdmin" | "user" | "admin"; // you can narrow down roles
  isVerified: boolean;
  premiumExpire: string | null; // some users have null
  bookmarksMovies: string[]; // assuming movie IDs are strings
  favoritesMovies: string[];
  bookmarksTV: string[];
  favoritesTV: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type SubscriptionPlan = {
  _id: string;
  name: string;
  durationDays: number;  // number of days for the plan
  price: number;         // numeric price
  currency: string;      // e.g., "MMK"
  description: string;   // can be empty string
  isActive: boolean;     // plan status
  createdAt: string;     // ISO date string
  updatedAt: string;     // ISO date string
  __v: number;
};

// export const prepareData = (respnse : )


export const getUserColumns = (plans : SubscriptionPlan[],onUpdateUser : (user: User) => void) => {

     const userColumns: ColumnDef<User>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "premiumExpireStatus",
        header: "Premium",
        cell: ({ row }) => {
          let data = row.getValue("premiumExpire") as string;
          if (data) {
            return (
              <div className="text-left  ">
                <div className="bg-green-400 p-2 rounded-2xl inline-block scale-75">
                  <Crown />
                </div>
              </div>
            );
          } else {
            return (
              <div className="bg-yellow-400 p-2 rounded-2xl inline-block scale-75">
                <ShieldAlert />{" "}
              </div>
            );
          }
        },
      },
      {
        accessorKey: "premiumExpire",
        header: "ExpireIn",
        cell: ({ row }) => {
          let data = row.getValue("premiumExpire") as string;
          if (data) {
            return (
              <div className="text-left  ">
                <div className="  rounded-2xl ">{data}</div>
              </div>
            );
          } else {
            return <div className="text-left font-medium">-</div>;
          }
        },
      },
      {
        accessorKey: "_id",
    
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
          const userId = row.getValue("_id") as string;
    
          return (
            <div>
              
              <UserRowActions userId={userId} plans={plans} onUpdateUser={onUpdateUser} />
            </div>
          );
        },
      },
      // {
      //   accessorKey: "amount",
      //   // header: "Amount",
      //     header: () => <div className="text-right">Amount hello</div>,
      //   cell: ({ row }) => {
      //     const amount = parseFloat(row.getValue("amount"))
      //     const formatted = new Intl.NumberFormat("en-US", {
      //       style: "currency",
      //       currency: "USD",
      //     }).format(amount)
    
      //     return <div className="text-right font-medium">{formatted}</div>
      //   },
      // },
    ];

    return userColumns
}

