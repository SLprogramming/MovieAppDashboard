import api from "@/axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/myComponents/data-table";
import { getAccountColumn } from "@/myComponents/dataColumn/accountColumn";
import { fetchAllAccount,addAccounts, type BankAccount, updateAccount } from "@/reducer/account.reducer";
import {
  fetchPaymentTypes,
  createPaymentTypes,
  deleteType
} from "@/reducer/payment.reducer";
import { useStoreDispatch, useStoreSelector } from "@/store/store";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Payment = () => {
  const dispatch = useStoreDispatch();
  const { paymentTypes } = useStoreSelector((state) => state.payment);
  const { accounts } = useStoreSelector((state) => state.account);
  const [selectedType, setSelectedType] = useState("All");
  
  const [accountNumberInput,setAccountNumberInput] = useState("")
  const [accountNameInput,setAccountNameInput] = useState("")
  const [selectedPaymentTypeForm,setSelectedPaymentTypeForm] = useState('')
  const [accountsDataToShow, setAccountsDataToShow] = useState<BankAccount[]>(
    []
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAccountIdToEdit,setSelectedAccountIdToEdit] = useState("")
  const [formPaymentType, setFormPaymentType] = useState<
    "currentTypes" | "newType"
  >("currentTypes");

  const [formPaymentNameInput, setFormPaymentNameInput] = useState("");

  const activateToogle = async (id :string) => {
    try {
      let selectedAccount = accounts.find(e => e._id == id)
      let res = await api.put('bankAccount/activate/'+id,{flag:!selectedAccount?.isActive})
      if(res.data.success){
        dispatch(updateAccount(res.data.data))
      }
    } catch (error) {
      
    }
  }

  const handleAccountUpdate = (id : string , activate = false) => {
    if(activate){
activateToogle(id)
    }else{
      setSelectedAccountIdToEdit(id)
    }
  }
  
const accountColumn = getAccountColumn(handleAccountUpdate,selectedAccountIdToEdit);
  const handleButton = async () => {
    if(paymentTypes.length == 1) return
    let currentIndex = paymentTypes.findIndex(e => e._id == selectedType)
    if(currentIndex != 0){
      currentIndex--
    }else{
      currentIndex++
    }
    try {
      dispatch(deleteType(selectedType))
    } catch (error) {
      
    }finally{
      setSelectedType(paymentTypes[currentIndex]._id)
    }
  }

const handleCreateAccount = async () => {
  
  try {
     let payload = {
      paymentType_id:selectedPaymentTypeForm,
      accNumber:accountNumberInput,
      name:accountNameInput
    }
    if(selectedAccountIdToEdit){
      let res = await api.put('bankAccount/update/'+selectedAccountIdToEdit,payload)
      if(res.data.success){
        dispatch(updateAccount(res.data.data))
      }
  }else{
    
   
    let res =await api.post('bankAccount/create',payload)
    if(res.data.success) {

      dispatch(addAccounts(res.data.data))
    }
  }
    // console.log(res.data.data)
    
  } catch (error) {
    
  }finally{
    setAccountNameInput("")
    setAccountNumberInput("")
  }
}

useEffect(() => {
  if(selectedAccountIdToEdit) {
    let selectedAccount = accounts.find(e => e._id == selectedAccountIdToEdit)
    setAccountNameInput(selectedAccount?.name || "")
    setAccountNumberInput(selectedAccount?.accNumber || "")
    setSelectedPaymentTypeForm(selectedAccount?.paymentType_id._id || "")
    setIsFormOpen(true)
  }
},[selectedAccountIdToEdit])
  useEffect(() => {
    (() => {
      dispatch(fetchPaymentTypes());
      dispatch(fetchAllAccount());
    })();
  }, []);

  useEffect(() => {
    if (selectedType == "All") {
      setAccountsDataToShow(accounts);
    } else {
      console.log('useeffect')
      setAccountsDataToShow(
        accounts.filter((e) => e.paymentType_id._id == selectedType)
      );
    }
  }, [selectedType, accounts]);

  return (
    <div className="w-full flex">
      <div className="w-2/3">
        <div className="flex justify-between mb-1">
          <div className="flex justify-start">
            <Tabs
              defaultValue="account"
              value={selectedType}
              className="w-[400px]"
              onValueChange={(val) => setSelectedType(val)}
            >
              <TabsList>
                <TabsTrigger value="All">All</TabsTrigger>
                {paymentTypes.map((e) => (
                  <TabsTrigger key={e._id} value={e._id}>
                    {e.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div>
            <Button size={"sm"} onClick={() => {
              setIsFormOpen(true)
              setSelectedAccountIdToEdit("")
              setAccountNameInput("")
              setAccountNumberInput("")
              setSelectedPaymentTypeForm("")
            }}>
              Add
            </Button>
          </div>
        </div>
        <DataTable columns={accountColumn} data={accountsDataToShow} conditionForNoResultButton={true} handleButton={handleButton} />
      </div>
      <div className="w-1/3 px-3">
        <div
          className={`w-[300px] py-3 px-4 rounded-2xl relative border-1 border-gray-200 flex flex-col items-center justify-center gap-3 transition-all duration-100 ease-in ${
            isFormOpen ? "scale-100" : "scale-0"
          }`}
        >
          <Button
            className="absolute right-0 top-0"
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              setIsFormOpen(false);
              setSelectedAccountIdToEdit('')
            }}
          >
            <X />
          </Button>
          <h2>{selectedAccountIdToEdit? "Update" : 'Create new account'}</h2>

          <div className="w-full">
            <Label htmlFor="accountName" className="mb-1">
              Account Name
            </Label>
            <Input
              type="string"
              id="accountName"
              value={accountNameInput}
              onChange={(e) => setAccountNameInput(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="accountNumber" className="mb-1">
              Account Number
            </Label>
            <Input
              type="string"
              id="accountNumber"
              value={accountNumberInput}
              onChange={(e) => setAccountNumberInput(e.target.value)}
              className="w-full"
            />
          </div>
          <RadioGroup
            value={formPaymentType}
            onValueChange={(val) =>
              setFormPaymentType(val as "currentTypes" | "newType")
            }
            className="w-full"
          >
            <div className="flex w-full justify-between">
              <div className="flex items-center space-x-2 w-[45%]">
                <RadioGroupItem value="currentTypes" id="currentTypes" />
                <Label htmlFor="currentTypes">Existing</Label>
              </div>
              <div className="flex items-center space-x-2 w-[45%]">
                <RadioGroupItem value="newType" id="newType" />
                <Label htmlFor="newType">New</Label>
              </div>
            </div>
          </RadioGroup>

          {formPaymentType == "currentTypes" ? (
            <div className="w-full">
              <Label htmlFor="paymentTypeSelect" className="mb-1">
                Payment Type
              </Label>
              <Select value={selectedPaymentTypeForm} onValueChange={(val) => setSelectedPaymentTypeForm(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a payment Type" />
                </SelectTrigger>
                <SelectContent id="paymentTypeSelect">
                  {paymentTypes.map((e) => {
                    return (
                      <SelectItem key={e._id} value={e._id}>
                        {e.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="w-full flex relative mt-5 justify-between">
              <Label htmlFor="paymentType" className="mb-1 absolute -top-5">
                Payment Type
              </Label>
              <div className="w-[75%] items-center">
                <Input
                  type="string"
                  id="paymentType"
                  value={formPaymentNameInput}
                  placeholder="Enter Payment Type"
                  onChange={(e) => setFormPaymentNameInput(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button className="w-[23%]" onClick={() => {
                if(formPaymentNameInput.trim() == "") return
                dispatch(createPaymentTypes(formPaymentNameInput))
                setFormPaymentNameInput("")
              }}>Add</Button>
            </div>
          )}

          <div className="w-full flex justify-center">
            <Button variant={"default"} size={"lg"} className="w-full" onClick={handleCreateAccount}>
              {selectedAccountIdToEdit?'Update':'Create'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
