"use client";
import useRoutes from "@/app/hooks/useRoutes";
import Link from "next/link";
import React from "react";
import SidebarItem from "./sidebarItem";

function SidebarList() {
  const routes = useRoutes();
  return (
    <div
      className="
      flex
      flex-row
      items-center
      justify-between
      w-full
      lg:flex-col
      lg:space-y-2
      lg:w-auto
    "
    >
      {routes?.map((item) => (
        <SidebarItem
          key={item.label}
          label={item.label}
          href={item.href}
          onClick={item.onClick}
          active={item.active}
          icon={item.icon}
        />
      ))}
    </div>
  );
}

export default SidebarList;
