"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  confirmPasswordLabel,
  confirmPasswordPlaceHolder,
  emailLabel,
  emailPlaceHolder,
  fullNameLabel,
  fullNamePlaceHolder,
  passwordLabel,
  passwordPlaceHolder,
  signupButtonTitle,
} from "../lib/constant";
import { useRouter } from "next/navigation";
import { userRegister } from "../lib/service";
import { signupFormSchema } from "../lib/schema";
import useUserStore from "@/app/store/user-store";

function SignupForm() {

  const router = useRouter()
  const { setLoading, isLoading, setUser } = useUserStore()

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema)
  });

  function onSubmit(values: z.infer<typeof signupFormSchema>) {

    const data = {
      email: values.email,
      password: values.password,
      fullName: values.fullName
    }
   
    userRegister(data, setUser, setLoading, router.push)

  }

  return (
    <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
      
       <FormField
          disabled={isLoading}
          control={form.control}
          name="fullName"
          render={({ field }) => (

            <FormItem>
              <FormLabel>{fullNameLabel}</FormLabel>
              <FormControl>
                <Input placeholder={fullNamePlaceHolder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (

            <FormItem>
              <FormLabel>{emailLabel}</FormLabel>
              <FormControl>
                <Input placeholder={emailPlaceHolder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (

            <FormItem>
              <FormLabel>{passwordLabel}</FormLabel>
              <FormControl>
                <Input placeholder={passwordPlaceHolder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="confirm_password"
          render={({ field }) => (

            <FormItem>
              <FormLabel>{confirmPasswordLabel}</FormLabel>
              <FormControl>
                <Input placeholder={confirmPasswordPlaceHolder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />

        <Button type="submit" className="w-full"  disabled={isLoading}>
          {signupButtonTitle}
        </Button>

      </form>

    </Form>
  );
}

export default SignupForm;
