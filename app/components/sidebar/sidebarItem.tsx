import Link from "next/link";
import React from "react";
import { AlertBar } from "../alert";

interface SidebarItemProps {
  label: string;
  icon: any;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  href,
  active,
  onClick,
}) => {

  const handleClick = ()=>{
    if(onClick) onClick()
  }

  if (label === "Logout") {
    return (
      <AlertBar
        title="Logout"
        description="Are sure you want to be logout?"
        onSucess={handleClick}
        successButtonTitle = {'Logout'}
      >
        <div
          className={`
          flex
          flex-col
          items-center
          p-2
          hover:bg-background
          transition-all
          rounded-md
      ${active && "bg-background"}
      `}
        >
          <Icon
            className={`
            w-6
            h-6
            shrink-0
      `}
          />
        </div>
      </AlertBar>
    );
  }
  return (
    <Link href= {href}>
      <div
        className={`
        flex
        flex-col
        items-center
        p-2
        hover:bg-background
        transition-all
        rounded-md
        ${active && "bg-background"}
        `}
      >
        <Icon
          className={`
          w-6
          h-6
          shrink-0
        `}
        />
      </div>
    </Link>
  );
};

export default SidebarItem;
