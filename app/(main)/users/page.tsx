import React from "react";
import dynamic from "next/dynamic";
const UserPage = dynamic(()=>import("../components/users/user"));
const EmptyState = dynamic(()=>import("@/app/components/emtyState")) ;

function Users() {
  return (
    <div
      className="
      h-full 
      flex
      flex-row
    "
    >
      <UserPage />
      <div className="flex-1 hidden lg:block">
        <EmptyState />
      </div>
    </div>
  );
}

export default Users;