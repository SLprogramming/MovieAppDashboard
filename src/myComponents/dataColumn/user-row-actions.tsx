import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
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

type UserRowActionsType = {
  userId: string;
  plans: SubscriptionPlan[];
  onUpdateUser:(user:User) => void;
};

const UserRowActions = ({ userId, plans ,onUpdateUser }: UserRowActionsType) => {

  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

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
                  className="w-full text-left font-bold"
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

          <DropdownMenuItem className="rounded-xl font-bold ps-2 pe-4 py-1 my-2 hover:bg-red-600 hover:text-white">
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl select-none ps-2 pe-4 py-1 my-2 hover:bg-yellow-400 font-bold">
            Deactivate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default UserRowActions;
