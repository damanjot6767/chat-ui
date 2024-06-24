import { H2, H3 } from '@/components/ui/typograpgy'
import React from 'react'

function ConversationTitle() {
  return (
   <div className='px-3 py-2 border-b-[1px] lg:border-b-[0px]'>
     <H3 title='Conversation'/>
   </div>
  )
}

export default React.memo(ConversationTitle)