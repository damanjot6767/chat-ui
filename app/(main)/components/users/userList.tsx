'use client'
import React, { useEffect, useState } from "react";
import { getAllUsers, getUserById } from "../../lib/users/service";
import { UserModel } from "../../lib/users/user-model";
import UserItem from "./userItem";
import useUserStore from "@/app/store/user-store";
import UsersListLoading from "./skeleton/userListSkeleton";

function UserList() {
  const { setLoading, isLoading, setUsers, users, setUser, user } = useUserStore()

  useEffect(() => {
    
    getUserById(setUser)
    getAllUsers(setUsers,setLoading);

  }, [])

  return (
    <div
      className="
      flex
      flex-col
      space-y-1
      px-3
      overflow-y-auto
      scrollbar-thin
      scrollbar-thumb-gray-500
    "
    >
      {users?.length ?
       users?.map((item)=>(item._id!==user?._id && <UserItem key={item._id} user={item}/>))
       : <UsersListLoading/>
      }
     
    </div>
  );
}

export default React.memo(UserList);
