import React from "react";
import Avatar from "./avatar";
import UserList from "./userList";
import UserTitle from "./userTitle";

function UserPage() {
  return (
    <div
      className="
      lg:pb-0
      lg:pl-20
      lg:w-1/3
      h-full
      bg-accent
      py-3
      flex
      flex-col
      pb-[70px]
      w-full
      border-r-[1px]
      border-background
   "
    >
      <UserTitle />
      <UserList />
    </div>
  );
}

export default React.memo(UserPage);
