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
  newPasswordButtonTitle,
  newPasswordLabel,
  newPasswordPlaceHolder,
} from "../lib/constant";
import { useRouter, useSearchParams } from "next/navigation";
import { newPasswordSchema } from "../lib/schema";
import { changePassword} from "../lib/service";


function NewPasswordForm() {
  const { get } = useSearchParams()
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues:{
      token : get('token') || '',
    }
  });

  function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    changePassword(values,setIsLoading,router.push)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          disabled={isLoading}
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{newPasswordLabel}</FormLabel>
              <FormControl>
                <Input placeholder={newPasswordPlaceHolder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {newPasswordButtonTitle}
        </Button>
      </form>
    </Form>
  );
}

export default NewPasswordForm;
