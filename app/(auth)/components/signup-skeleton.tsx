"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@/components/ui";
import React from "react";

function SignupSkeleton() {
  return (
    <Card className="w-full md:max-w-sm">
      <CardHeader className="space-y-2">
        <Skeleton className="h-8" />
        <div className="space-y-1">
          <Skeleton className="h-2" />
          <Skeleton className="h-2 w-1/3" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-5 w-full">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 " />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 " />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 " />
          </div>

          <Skeleton className="h-9" />
        </div>
      </CardContent>

      <div onClick={() => {}} className="flex items-center p-6 pt-2">
        <Skeleton className="h-2 w-full" />
      </div>

      <CardFooter className="flex flex-row items-center justify-between">
        <Skeleton className="w-[40%] h-9" />
        <Skeleton className="w-[40%] h-9" />
      </CardFooter>
    </Card>
  );
}

export default SignupSkeleton;
