import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuPortal,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { SubscriptionPlan, User } from "./UserColumn";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import api from "@/axios";
import { toast } from "react-toastify";
import { useStoreSelector } from "@/store/store";

type UserRowActionsType = {
  userId: string;
  plans: SubscriptionPlan[];
  onUpdateUser:(user:User) => void;
  role:string
};

const UserRowActions = ({ userId, plans ,onUpdateUser ,role}: UserRowActionsType) => {

  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const userState = useStoreSelector(state => state.user)

  const handlePromote = async (role : string) => {
    try {

      let res = await api.put('user/promote/'+userId,{role})
      if(res.data.success){
        toast.success('successfully change user role',{autoClose:2000,position:"top-center"})
        onUpdateUser(res.data.user)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    
    
    let dayToShow = plans.find(
      (e) => e._id == selectedPlan
    ) as SubscriptionPlan;
    setSelectedDay(dayToShow?.durationDays || 1);
  }, [selectedPlan,plans]);

  const extendPremium = async (days:number) => {
    try {
      let payloadData = {
        id:userId,
        days
      }
      let res = await api.put('auth/extend-premium',payloadData)

  
      if(res.data.success){
        toast.success('successfully subscribe',{autoClose:2000,position:"top-center"})
        onUpdateUser(res.data.data)
      }
    } catch (error) {
      
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          align="start"
          className="w-[150px] z-[999] min-w-[8rem] rounded-md border bg-popover p-3 shadow-md
                 data-[side=bottom]:animate-slide-up
                 data-[side=top]:animate-slide-down
                 data-[state=open]:animate-fade-in
                 data-[state=closed]:animate-fade-out"
        >
          {/* Dropdown item triggers Popover */}
          <DropdownMenuItem
            asChild
            className="rounded-xl select-none ps-2 pe-4 py-1 my-2"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-left "
                >
                  Extend Premium
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 z-[9999]">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="leading-none font-medium">Premium</h4>
                  </div>
                  <div className="grid gap-2">
                    {/* Day input */}
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="day">Day</Label>
                      <Input
                        type="number"
                        id="day"
                        min={1}
                        value={selectedDay}
                        onChange={(e) =>
                          setSelectedDay(parseInt(e.target.value) || 1)
                        }
                        className="col-span-2 h-8"
                      />
                    </div>

                    {/* Select plan */}
                    <Select value={selectedPlan}
                    onValueChange={(value) => setSelectedPlan(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Plan" />
                      </SelectTrigger>
                      <SelectContent  className="z-[10000]">
                        <SelectGroup>
                          <SelectLabel>Select Plan</SelectLabel>
                          {plans.map((i) => (
                            <SelectItem
                              key={i._id}
                              value={i._id}
                           
                            >
                              {i.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {/* Confirm button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-left"
                      onClick={() => extendPremium(selectedDay)}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </DropdownMenuItem>

           {userState.role == "superAdmin" && (<>
           {/* <DropdownMenuItem className="my-2">
            Delete
          </DropdownMenuItem> */}
         <DropdownMenuItem className="my-2" onClick={() => handlePromote( role == "user" ? "admin" : "user")} >
            {role == "user" ? "Promote Admin" : "Depromote User"}
          </DropdownMenuItem>
           </>)}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default UserRowActions;
