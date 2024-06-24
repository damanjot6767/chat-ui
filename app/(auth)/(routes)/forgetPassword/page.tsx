"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui";
import { H2, H5 } from "@/components/ui/typograpgy";
import {
  forgetPasswordHeaderDescription,
  forgetPasswordHeaderTitle,
} from "../../lib/constant";
import dynamic from "next/dynamic";
const ForgetPasswordForm = dynamic(()=>import("../../components/forget-password-form")) ;
import Link from "next/link";
import { Routes } from "@/app/lib/constant";
import { deleteCookie } from "cookies-next";


export default function ForgetPassword() {

  return (
    <Card className="w-full max-h-screen md:max-w-sm">

      <CardHeader>

        <H2 title={forgetPasswordHeaderTitle} />
        <CardDescription>{forgetPasswordHeaderDescription}</CardDescription>

      </CardHeader>

      <CardContent>
        <ForgetPasswordForm />
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
