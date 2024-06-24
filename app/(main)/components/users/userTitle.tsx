import { H3 } from '@/components/ui/typograpgy'
import React from 'react'

function UserTitle() {
  return (
   <div className='px-3 py-2 border-b-[1px] lg:border-b-[0px]'>
     <H3 title='Users'/>
   </div>
  )
}

export default React.memo(UserTitle)