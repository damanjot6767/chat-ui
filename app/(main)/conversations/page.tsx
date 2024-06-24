import React from "react";
import dynamic from "next/dynamic";
const ConversationPage = dynamic(()=>import("../components/conversations/conversation")) ;
const EmptyState = dynamic(()=>import("@/app/components/emtyState")) ;

function Coversation() {
  return (
    <div
      className="
      h-full 
      flex
      flex-row
    "
    >
      <ConversationPage />
      <div className="flex-1 hidden lg:block">
        <EmptyState />
      </div>
    </div>
  );
}

export default Coversation;
