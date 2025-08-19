import api from "@/axios";

import { DataTable } from "@/myComponents/data-table";


import { useEffect, useState } from "react";


import { getUserColumns, type SubscriptionPlan, type User } from "@/myComponents/dataColumn/UserColumn";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";



type UsersStatus = "All" | "User" | "Admin" | "Premium"

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [plans,setPlans] = useState<SubscriptionPlan[]>([])
  const [usersStatus,setUsersStatus] = useState<UsersStatus>("All")
  const [filteredUsers,setFilteredUsers] = useState<User[]>([])
  const [paginate,setPaginate] = useState(1)
  const [totalPages,setTotalPages] = useState(1)

  useEffect(() => {
    
    switch (usersStatus) {
      case "All":
        setFilteredUsers(users)
        break;
      case "User":
        setFilteredUsers(users.filter(e => e.role == 'user'))
        break;
      case "Admin":
        setFilteredUsers(users.filter(e => e.role == 'admin'))
        break;
      case "Premium":
        setFilteredUsers(users.filter(e => e.premiumExpire))
        break;
    
      default:
        break;
    }
  },[usersStatus,users])
    const handleUserUpdate = (user:User) => {
    setUsers((prev) => {
     return prev.map(e=>e._id == user._id ? user : e)
    })
  }
  const userColumn = getUserColumns(plans,handleUserUpdate)
  const getAllusers = async () => {
    try {
      let res = await api.get(`user/get-all?page=${paginate}`);
    
      let data = res.data.users
      setTotalPages(res.data.pagination.totalPages)
      setUsers(data);
    } catch (error) {}
  };

  const handlePaginate = (flag:"prev" | "next") => {
    if(flag=="prev" && paginate > 1 ){
      setPaginate(prev => prev - 1)
      console.log('prev',paginate)
    }
    if(flag=="next" && paginate < totalPages){
      setPaginate(prev => prev + 1)
      console.log('next',paginate)
    }
 

  }




  const getPlans = async () => {
    try {
      let res = await api.get('plan/get-all')
      setPlans(res.data.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAllusers();
    
  }, [paginate]);

  useEffect(() => {

    getPlans()
  },[])

  return (
    <div className="w-full">
      <div className="flex w-full gap-2 mb-1">
        <div>
  <Select value={usersStatus} onValueChange={(val) => setUsersStatus(val as UsersStatus)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="Premium">Premium</SelectItem>
          <SelectItem value="User">User</SelectItem>
       
        </SelectGroup>
      </SelectContent>
    </Select>


        </div>
       
      </div>
      <DataTable columns={userColumn} data={filteredUsers} handlePaginate={handlePaginate}></DataTable>
    </div>
  );
};

export default Users;
