import api from "@/axios";
import { DataTable } from "@/myComponents/data-table";
import { addPlan, setPlans ,updatePlan,deletePlan} from "@/reducer/plan.reducer";
import { useStoreDispatch, useStoreSelector } from "@/store/store";
import React, { useEffect, useState } from "react";
// import type {SubscriptionPlan} from "@/reducer/user.reducer.tsx"
import { getPlanColumn } from "@/myComponents/dataColumn/PlanColumn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "react-toastify";


type PlanInput = {
  planName: string;
  price: number;
  currency: string;
  days: number;
  description: string;
};

const planInputInitial: PlanInput = {
  planName: "",
  price: 0,
  currency: "MMK",
  days: 1,
  description: "-",
};

const Plans = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [planInput, setPlanInput] = useState(planInputInitial);
  const [selectedIdToEdit,setSelectedIdToEdit] = useState("")
  const { plans } = useStoreSelector((state) => state.plan);
  const handleDeletePlan = async (id:string) => {
    try {
      let res = await api.delete('plan/delete/'+id)
      if(res.data.success){
        dispatch(deletePlan(id))
                  toast.success("successfully deleted",{position:"top-center",autoClose:2000})

      }else{

        toast.error(res.data.message || 'fail to delete plan',{position:"top-center",autoClose:2000})
      }
    } catch (error) {

    }
  }

  const planColumn = getPlanColumn(handleDeletePlan,setSelectedIdToEdit,selectedIdToEdit);
  const dispatch = useStoreDispatch();

  const getPlans = async () => {
    try {
      let res = await api.get("plan/get-all");
      console.log(res.data.data);
      dispatch(setPlans(res.data.data));
    } catch (error) {}
  };

  const handleCreatePlans = async () => {
    try {
      let payloadData = {
        name:planInput.planName,
        price:planInput.price,
        currency:planInput.currency,
        durationDays:planInput.days,
        description:planInput.description
      }
      if(selectedIdToEdit){
        let res = await api.put('plan/update/'+selectedIdToEdit , payloadData)
        if(res.data.success){

          dispatch(updatePlan(res.data.data))
          toast.success("successfully updated",{position:"top-center",autoClose:2000})
        }else{
          toast.error(res.data.message || 'plan update fail',{position:"top-center",autoClose:2000})
        }
      }else{

        let res =await api.post('plan/create',payloadData)
        if(res.data.success){

          dispatch(addPlan(res.data.data))
                    toast.success("successfully created",{position:"top-center",autoClose:2000})

        }else{
            toast.error(res.data.message || 'plan create fail',{position:"top-center",autoClose:2000})
        }
      }
    } catch (error) {
      
    }
  }

  
  useEffect(() => {
    getPlans();
  }, []);

  useEffect(() => {
    if(selectedIdToEdit){
      setIsFormOpen(true)
    }
    let data  = plans.find(e => e._id == selectedIdToEdit) 
    if(data){

      setPlanInput({planName:data.name,price:data.price,currency:data.currency,days:data.durationDays,description:data.description})
    }else{
      setPlanInput(planInputInitial)
    }

  },[selectedIdToEdit])

  return (
    <div className="w-full flex">
      <div className="w-2/3 ">
        <div className="flex justify-between mb-1">
          <h2 className="font-bold ps-1 mb-1">All Plans</h2>
          <div>
            <Button size={"sm"} onClick={() => {
              setIsFormOpen(true)
              setSelectedIdToEdit('')
            }}>
              Add
            </Button>
          </div>
        </div>
        <DataTable columns={planColumn} data={plans}></DataTable>
      </div>
      <div className="w-1/3 px-3">
        <div
          className={`w-[260px] py-3 px-4 rounded-2xl relative border-1 border-gray-200 flex flex-col items-center justify-center gap-3 transition-all duration-100 ease-in ${
            isFormOpen ? "scale-100" : "scale-0"
          }`}
        >
          <Button className="absolute right-0 top-0" variant={"ghost"} size={"icon"} onClick={() => {
            setIsFormOpen(false)
            setSelectedIdToEdit("")
          }}>
            <X />
          </Button>
          <h2>{selectedIdToEdit?'Update':'Create New Plan'}</h2>
          <div className="w-full">
            <Label htmlFor="name" className="mb-1">
              Name
            </Label>
            <Input
              type="string"
              id="name"
              value={planInput.planName}
              onChange={(e) =>
                setPlanInput((prev) => {
                  return { ...prev, planName: e.target.value };
                })
              }
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="price" className="mb-1">
              Price
            </Label>
            <Input
              type="number"
              min={1}
              id="price"
              value={planInput.price}
              onChange={(e) =>
                setPlanInput((prev) => {
                  return { ...prev, price: parseInt(e.target.value) };
                })
              }
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="Currency" className="mb-1">
              Currency
            </Label>
            <Input
              type="string"
              id="Currency"
              value={planInput.currency}
              onChange={(e) =>
                setPlanInput((prev) => {
                  return { ...prev, currency: e.target.value };
                })
              }
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="Days" className="mb-1">
              Days
            </Label>
            <Input
              type="number"
              id="Days"
              value={planInput.days}
              onChange={(e) =>
                setPlanInput((prev) => {
                  return { ...prev, days: parseInt(e.target.value) };
                })
              }
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="Description" className="mb-1">
              Description
            </Label>
            <Input
              type="string"
              id="Description"
              value={planInput.description}
              onChange={(e) =>
                setPlanInput((prev) => {
                  return { ...prev, description: e.target.value };
                })
              }
              className="w-full"
            />
          </div>
          <div className="w-full flex justify-center">
            <Button variant={"default"} size={"lg"} className="w-full" onClick={handleCreatePlans}>
              {selectedIdToEdit? "Save" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
