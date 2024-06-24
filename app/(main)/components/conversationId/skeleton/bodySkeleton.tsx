'use client'
import { Skeleton } from '@/components/ui'
import React from 'react'

let count = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25)
function BodySkeleton() {
  return (
    <div
    className="
    w-full"
    >
    {count?.map((item) =>
      item%2 == 1 ? (
        <div
          key={item}
          className="
          flex 
          flex-row 
          items-start
          justify-start 
          space-x-1
          w-full 
         "
        >
          <div
            className="
            flex 
            flex-col
            items-end 
            w-full
          "
          >
            <Skeleton className='h-8 w-1/3 rounded-md' />
          </div>
        </div>
      ) : (
        <div
          key={item}
          className="
          flex 
          flex-row 
          items-start
          justify-start 
          space-x-1
          w-full 
        "
        >
          <div
            className="
            flex 
            flex-col
            items-start 
            w-full
          "
          >
            <Skeleton className='h-8 w-1/3 rounded-md' />
          </div>
        </div>
      )
    )}
  </div>
  )
}

export default React.memo(BodySkeleton)