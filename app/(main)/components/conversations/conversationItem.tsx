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
  const { setConversation } = useConversationStore()
  const { conversationUser} = useConversationUser(conversation,user)
  const { typing} = useMessageStore();

  const { socket } = useSocket();

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
        <H5 title={typing===conversation?._id?'typing...':'new conversation'} />
      </div>
    </div>
  );
}

export default React.memo(ConversationItem);
