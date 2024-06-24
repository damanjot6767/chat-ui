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
  forgetPasswordButtonTitle,
  loginButtonTitle,
} from "../lib/constant";
import { useRouter } from "next/navigation";
import { forgetPasswordSchema } from "../lib/schema";
import { forgetPassword } from "../lib/service";


function ForgetPasswordForm() {
  
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  function onSubmit(values: z.infer<typeof forgetPasswordSchema>) {
    forgetPassword(values,setIsLoading)
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {forgetPasswordButtonTitle}
        </Button>
      </form>
    </Form>
  );
}

export default ForgetPasswordForm;
