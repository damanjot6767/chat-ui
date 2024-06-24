import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { deleteCookie } from "cookies-next";
import { Toaster } from "../lib/toast";
import { Routes } from "../lib/constant";


const useRoutes = () => {
  const pathname = usePathname();
  const navigation = useRouter()

  const routes = useMemo(() => [
    { 
      label: 'Chat', 
      href: Routes.Conversations, 
      icon: HiChat,
      active: pathname.includes(Routes.Conversations) 
    },
    { 
      label: 'Users', 
      href: Routes.Users, 
      icon: HiUsers, 
      active: pathname === Routes.Users
    },
    {
      label: 'Logout', 
      onClick: () => {

        deleteCookie('accessToken')
        navigation.push(Routes.Login)
        Toaster('success','logout succes')

      },
      href: '#',
      icon: HiArrowLeftOnRectangle, 
    }
  ], [pathname]);

  return routes;
};

export default useRoutes;