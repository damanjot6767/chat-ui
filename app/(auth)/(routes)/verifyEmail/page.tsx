"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui";
import { H2, H5 } from "@/components/ui/typograpgy";
import { resendEmailButtonTitle, verifyEmailDescription, verifyEmailHeaderTitle } from "../../lib/constant";
import { Button } from "@/components/ui/button";
import { verifyEmail } from "../../lib/service";
import { getUserById } from "@/app/(main)/lib/users/service";
import { GetUserResposeModel } from "@/app/(main)/lib/users/user-model";
import { useRouter } from "next/navigation";



export default function Login() {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false);
  const [user,setUser] = useState<GetUserResposeModel | null>(null)

  useEffect(()=>{
   getUserById(setUser)
  },[])

  useEffect(()=>{
    if(user?.isEmailVerified){
      return router.push('/users')
   }
  },[user])
  const sendVerificationEmail = () => {
    verifyEmail(setIsLoading)
  }

  return (
    <Card className="w-full max-h-screen md:max-w-sm">
      <CardHeader>
        <div
          className="
          flex 
          justify-between 
          items-center"
        >
          <H2 title={verifyEmailHeaderTitle} />
        </div>
        <CardDescription>{verifyEmailDescription}</CardDescription>
      </CardHeader>

      <CardContent>

        <Button  className="w-full" onClick={sendVerificationEmail} disabled={isLoading} >
          {resendEmailButtonTitle}
        </Button>

      </CardContent>

    </Card>
  );
}
