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
import { Button } from "@/components/ui/button";
import LoginForm from "../../components/login-form";
import {
  continueWithTitle,
  githubButtonTitle,
  googleButtonTitle,
  loginHeaderDescription,
  loginHeaderTitle,
  signupButtonTitle,
} from "../../lib/constant";
import Link from "next/link";
import { Routes } from "@/app/lib/constant";


export default function Login() {

  return (
    <Card className="w-full max-h-screen md:max-w-sm">
      <CardHeader>
        <div
          className="
          flex 
          justify-between 
          items-center"
        >
          <H2 title={loginHeaderTitle} />
          <Link
            href={"/signup"}
            className="
            hover:bg-accent 
            hover:text-accent-foreground 
            transition-colors 
            py-1 
            px-2 
            rounded-md"
          >
            <H5 title={signupButtonTitle} />
          </Link>
        </div>
        <CardDescription>{loginHeaderDescription}</CardDescription>
      </CardHeader>

      <CardContent>
        <LoginForm />
      </CardContent>

      <div
        onClick={() => { }}
        className="
        relative 
        flex 
        items-center 
        p-8 
        pt-2"
      >
        <hr className="border w-full" />
        <CardDescription
          className="
          absolute 
          left-1/2 
          transform 
          -translate-x-1/2 
          bg-card 
          px-2"
        >
          {continueWithTitle}
        </CardDescription>
      </div>

      <CardFooter className="flex flex-col gap-4 items-end">
       
       <div 
        className="
        w-full
        flex 
        flex-row 
        items-center 
        justify-between"
        >
          <Button
            className="
          bg-transparent 
          w-[40%] 
          hover:animate-bounce 
          hover:direction-normal"
            variant={"outline"}
          >
            {githubButtonTitle}
          </Button>
          <Button
            className="
          bg-transparent 
          w-[40%] 
          hover:animate-bounce 
          hover:direction-normal"
            variant={"outline"}
          >
            {googleButtonTitle}
          </Button>
        </div>

        <Link
          href={Routes.ForgetPassword}
          className="
            text-right
            hover:bg-accent 
            hover:text-accent-foreground 
            transition-colors 
            py-1 
            px-2 
            rounded-md"
        >
          <H5 title={'Forget password'} />
        </Link>

      </CardFooter>

    </Card>
  );
}
