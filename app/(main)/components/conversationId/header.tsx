'use client';
import Avatar from "@/app/(main)/components/users/avatar";
import { useConversationUser } from "@/app/hooks/useConversationUser";
import useConversationStore from "@/app/store/conversation-store";
import useMessageStore from "@/app/store/message-store";
import useUserStore from "@/app/store/user-store";
import { H4, H5 } from "@/components/ui/typograpgy";
import React, { useEffect, useState } from "react";

function Header() {

  const { user } = useUserStore();
  const { conversation } = useConversationStore();
  const { typing} = useMessageStore();

  const { conversationUser } = useConversationUser(conversation,user)

  return (
    <div
      className="
      w-full
      bg-accent
      px-3
      py-2
      border-b-[1px]
      flex
      flex-row
      items-center
      justify-between
      "
    >
      <div
        className="
        flex 
        flex-row 
        items-center 
        space-x-2 
        "
      >
        <Avatar />
        <div
          className="
          flex 
          flex-col 
        "
        >
          <H4 title={conversationUser?.email || 'N/A'} />
          <H5 title="new mewssage" />
          {typing &&  <H5 title="typing..." />}
        </div>
      </div>
      <div
        className="
        flex 
        flex-row 
        items-center 
        space-x-1 
        "
      >
        <span className="p-[3px] bg-gray-500 rounded-full" />
        <span className="p-[3px] bg-gray-500 rounded-full" />
        <span className="p-[3px] bg-gray-500 rounded-full" />
      </div>
    </div>
  );
}

export default React.memo(Header);
