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
  emailLabel,
  emailPlaceHolder,
  loginButtonTitle,
  passwordLabel,
  passwordPlaceHolder,
} from "../lib/constant";
import { userAuth } from "../lib/service";
import { useRouter } from "next/navigation";
import { loginFormSchema } from "../lib/schema";
import useUserStore from "@/app/store/user-store";


function LoginForm() {
  
  const router = useRouter()
  const { setLoading, isLoading, setUser } = useUserStore()

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    userAuth(values, setUser, setLoading, router.push)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {loginButtonTitle}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
