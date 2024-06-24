'use client'
import React from "react";
import SidebarList from "./sidebarList";
import useConversation from "@/app/hooks/useConversation";


function Sidebar() {
  const {isOpen} = useConversation();

  return (
    <div
      className={`
      bg-accent
      fixed
      bottom-0
      h-[60px]
      px-4
      py-2
      border-t-[1px]
      border-background
      w-full
      flex
      flex-row
      items-center
      justify-between
      lg:top-0
      lg:w-20
      lg:h-full
      lg:flex-col
      lg:border-r-[1px]
      lg:block
      ${isOpen && 'hidden'}
      `}
    >
      <SidebarList />
    </div>
  );
}

export default Sidebar;
