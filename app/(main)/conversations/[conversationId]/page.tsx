'use client'
import React, { useEffect } from "react";
import ConversationPage from "../../components/conversations/conversation";
import Header from "../../components/conversationId/header";
import Body from "../../components/conversationId/body";
import Form from "../../components/conversationId/form";


interface IParams {
  conversationId: string;
}

function ConversationId({ params }: { params: IParams }) {
  
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
