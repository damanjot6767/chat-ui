'use client'
import React, { useEffect, useState } from "react";
import ConversationItem from "./conversationItem";
import { getUserConversations } from "../../lib/conversations/service";
import useConversationStore from "@/app/store/conversation-store";
import useMessageStore from "@/app/store/message-store";
import { useSocket } from "@/app/components/providers/socket-provider";
import ConversationListLoading from "./skeleton/conversationLoadingSkeleton";
import { usePathname } from "next/navigation";
import { ChatEventEnum } from "@/app/lib/constant";

function ConversationList() {
  const pathname = usePathname();
  const {
    setLoading,
    setConversations,
    conversations
  } = useConversationStore()
  const { socket } = useSocket();
  const { typing, setTyping } = useMessageStore();

  useEffect(() => {

    getUserConversations(setConversations, setLoading);

  }, [])

  useEffect(() => {
    if (socket) {
      socket.onmessage = (res: any) => {
        const data = JSON.parse(res.data);
        if(data.event===ChatEventEnum.TYPING_EVENT){
          setTyping(data.typing?data.chatId:null)
        }
      };
    }

    return () => {
    };

  }, [socket])


  return (
    <div
      className="
      flex
      flex-col
      space-y-1
      px-3
      overflow-y-auto
      scrollbar-thin
      scrollbar-thumb-gray-500
    "
    >
      {conversations?.length ? conversations?.map((item) =>
        <ConversationItem
          key={item._id}
          conversation={item}
          active = {pathname.includes(item._id)}
        />
      ) :
        <ConversationListLoading />
      }

    </div>
  );
}

export default React.memo(ConversationList);
