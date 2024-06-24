'use client'
import React, { useEffect } from "react";
import ConversationPage from "../../components/conversations/conversation";
import Header from "../../components/conversationId/header";
import Body from "../../components/conversationId/body";
import Form from "../../components/conversationId/form";
import { useSocket } from "@/app/components/providers/socket-provider";
import useMessageStore from "@/app/store/message-store";
import { ChatEventEnum } from "@/app/lib/constant";

interface IParams {
  conversationId: string;
}

function ConversationId({ params }: { params: IParams }) {
  const { socket } = useSocket();
  const { setMesssage, setTyping, setMesssages } = useMessageStore();


  useEffect(() => {

    setTyping(null);

    if (socket) {
      socket.onmessage = (res: any) => {
        const data = JSON.parse(res);

        if(data.event===ChatEventEnum.TYPING_EVENT){
          setTyping(data.typing?data.chatId:null)
        }

        else if(data.event===ChatEventEnum.MESSAGE_RECEIVED_EVENT){
          setMesssage(data.data)
        }
      }

    }

    return () => {
    };

  }, [socket])

  return (
    <div
      className="
      h-full
      flex
      flex-row
    "
    >
      <div className="hidden lg:block ">
        <ConversationPage />
      </div>

      <div
        className="
          h-full
          flex
          flex-col
          w-full
          "
      >
        <Header />
        <Body />
        <Form />

      </div>
    </div>
  );
}

export default ConversationId;
