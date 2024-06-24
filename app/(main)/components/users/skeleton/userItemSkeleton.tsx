'use client'
import { Skeleton } from '@/components/ui'
import React from 'react'

function UserItemSkeleton() {
  return (
    <div
      className="
      flex 
      flex-row 
      items-center 
      space-x-2 
      p-2 
      hover:bg-background 
      rounded-md
      transition-all"
    >
      <Skeleton className='h-12 w-12 rounded-full'/>
      <div
        className="
        flex-1
        flex-col
        space-y-2"
      >
        <Skeleton className='h-4 w-full rounded-full'/>
        <Skeleton className='h-3  w-2/4 rounded-full' />
      </div>
    </div>
  )
}
export default React.memo(UserItemSkeleton)
