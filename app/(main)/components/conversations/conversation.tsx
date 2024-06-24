import React from "react";
import ConversationTitle from "./conversationtTitle";
import dynamic from "next/dynamic";

const ConversationList =  dynamic(()=>import("./conversationList"),{ssr: false}) ;

function ConversationPage() {
  return (
    <div
      className="
      lg:pb-0
      lg:pl-20
      lg:w-[400px]
      h-full
      bg-accent
      py-3
      flex
      flex-col
      pb-[70px]
      w-full
      border-r-[1px]
      border-background
   "
    >
      <ConversationTitle />
      <ConversationList />
    </div>
  );
}

export default React.memo(ConversationPage);
