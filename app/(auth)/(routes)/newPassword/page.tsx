"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui";
import { H2, H5} from "@/components/ui/typograpgy";
import {
  newPasswordHeaderDescription,
  newPasswordHeaderTitle,
} from "../../lib/constant";
import NewPasswordForm from "../../components/new-password-form";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Routes } from "@/app/lib/constant";


export default function NewPassword() {
  return (
    <Card className="w-full max-h-screen md:max-w-sm">

      <CardHeader>

        <H2 title={newPasswordHeaderTitle} />
        <CardDescription>{newPasswordHeaderDescription}</CardDescription>

      </CardHeader>

      <CardContent>
        <NewPasswordForm/>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 items-end">

        <Link
          href={Routes.ForgetPassword}
          onClick={()=>deleteCookie('forgetPassword')}
          className="
            text-right
            hover:bg-accent 
            hover:text-accent-foreground 
            transition-colors 
            py-1 
            px-2 
            rounded-md"
        >
          <H5 title={'Change Email'} />
        </Link>

      </CardFooter>
      
    </Card>
  );
}
