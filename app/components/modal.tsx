import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { Children } from "react"

export function Modal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Logout </DialogTitle>
          <DialogDescription>
            Are you sure you want to be logout
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Logout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
