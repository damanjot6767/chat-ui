import React from "react";
import { H3, H4 } from "../../components/ui/typograpgy";

function EmptyState() {
  return (
    <div
      className="
      h-full
      w-full
      flex
      flex-col
      items-center
      justify-center
      mx-auto
      "
    >
      <H4 title="Select a chat or Start a new Conversation" />
    </div>
  );
}

export default EmptyState;
