import * as z from "zod";

export const loginFormSchema = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    })
  });

export const signupFormSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
    confirm_password: z.string().min(2, {
      message: "Confirm Password must be at least 2 characters.",
    }),
  });

  export const forgetPasswordSchema = z.object({
    email: z.string().email(),
  });

  export const newPasswordSchema = z.object({
    token: z.string(),
    new_password: z.string(),
  });