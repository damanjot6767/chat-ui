'use client'
import { useSocket } from "@/app/components/providers/socket-provider";
import useConversation from "@/app/hooks/useConversation";
import { Input } from "@/components/ui";
import React, { useRef, useState } from "react";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { createMessage } from "../../lib/conversations/service";
import useMessageStore from "@/app/store/message-store";
import { useConversationUser } from "@/app/hooks/useConversationUser";
import useConversationStore from "@/app/store/conversation-store";
import useUserStore from "@/app/store/user-store";
import { ChatEventEnum } from "@/app/lib/constant";
let id: any = null;
function Form() {

  const [message, setMessage] = useState('')
  const { socket } = useSocket();
  const { conversationId } = useConversation();
  
  const {conversation} = useConversationStore();
  const {user} = useUserStore();
  const {conversationUser} = useConversationUser(conversation,user)
  const { isLoading, setLoading, setMesssage, setIndividualMessage} = useMessageStore();
  
  const [localTyping, setLocalTyping] = useState(false)

  const handleChange = (e: any) => {
    setMessage(e.target.value);

    if (socket) {

      if (!message) {
        setLocalTyping(true)
        socket.send(JSON.stringify({
          chatId:conversation?._id,
          event: ChatEventEnum.TYPING_EVENT,
          typing: true
        }));
        console.log("working")
      }

      if (id) clearTimeout(id)

      id = setTimeout(() => {
        console.log("working")
        socket.send(JSON.stringify({
          chatId:conversation?._id,
          event: ChatEventEnum.TYPING_EVENT,
          typing: false
        }));
      }, 4000)

    }
  }

  const sendMessage = (e: any) => {
    e?.preventDefault()
    setIndividualMessage({ 
      body: message, 
      chatId: conversationId,
      messageSentBy: user?._id, 
      userIds: conversation?.userIds?.map((item)=>item.userId), 
      video:null,
      image:null,
      file:null
    })
    createMessage(
      { 
        body: message, 
        chatId: conversationId, 
        userIds: conversation?.userIds?.map((item)=>item.userId), 
        video:null,
        image:null,
        file:null
      }, setMesssage, setIndividualMessage, setLoading);
  }


  return (
    <form
      className="
      bg-accent
      px-3
      py-3
      border-t-[1px]
      flex
      flex-row
      items-center
      space-x-3
      "
      onSubmit={sendMessage}
    >
      <HiPhoto size={30} />
      <div
        className="
        flex-1
        "
      >
        <Input
          className="
          bg-background
          rounded-full
          hover:bg-background
          focus:border-gray-500"
          value={message}
          onChange={handleChange}
        />
      </div>
      <button
        className="
        rounded-full 
        p-2 
        bg-background"
        type="submit"
        disabled={isLoading?true : false}
        >
        <HiPaperAirplane size={18} />
      </button>
    </form>
  );
}

export default React.memo(Form);
