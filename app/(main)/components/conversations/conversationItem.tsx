"use client"
import React, { useEffect, useState } from "react";
import Avatar from "../users/avatar";
import { H4, H5 } from "@/components/ui/typograpgy";
import { ConversationModal } from "../../lib/conversations/conversation-model";
import useConversationStore from "@/app/store/conversation-store";
import { usePathname, useRouter } from "next/navigation";
import { ChatEventEnum, Routes } from "@/app/lib/constant";
import useUserStore from "@/app/store/user-store";
import { useConversationUser } from "@/app/hooks/useConversationUser";
import useMessageStore from "@/app/store/message-store";
import { useSocket } from "@/app/components/providers/socket-provider";
import { Button } from "@/components/ui/button";

interface ConversationItemProps {
  conversation: ConversationModal,
  active: boolean
}

function ConversationItem({
  conversation,
  active
}: ConversationItemProps) {
  const router = useRouter();
  const { user } = useUserStore();
  const { conversationUser } = useConversationUser(conversation, user)

  const handleClick = () => {
    router.push(`${Routes.Conversations}/${conversation?._id}`)
    // setConversation(conversation);
  }


  return (
    <div
      className={`
      flex 
      flex-row 
      items-center 
      space-x-2 
      p-2 
      hover:bg-background 
      rounded-md
      transition-all
      ${active && 'bg-background'}`}
      onClick={handleClick}
    >
      <Avatar />
      <div
        className="
        flex 
        flex-col 
      ">
        <H4 title={conversationUser?.email || 'N/A'} />
        {conversation.isNewMessage ?
          <div className="flex items-center justify-between">
            <H5 title={conversation.isNewMessage.body ? conversation.isNewMessage.body : ""} />
            <div className="flex items-center justify-center w-5 h-5 p-2 rounded-full bg-primary">
              <H5 className="text-white text-[10px] mt-[1px]" title={conversation.unseenMessagesIds?.length ? conversation.unseenMessagesIds.length : 0} />
            </div>
          </div>
          : null
        }
        {
          conversation.isTyping ? <H5 title="typing..." /> : null
        }
      </div>
    </div>
  );
}

export default React.memo(ConversationItem);
