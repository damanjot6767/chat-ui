import Avatar from "@/app/(main)/components/users/avatar";
import { useConversationUser } from "@/app/hooks/useConversationUser";
import useConversationStore from "@/app/store/conversation-store";
import useMessageStore from "@/app/store/message-store";
import useUserStore from "@/app/store/user-store";
import { H4, H5 } from "@/components/ui/typograpgy";
import React, { useEffect, useRef } from "react";
import { getMessagesByChatId } from "../../lib/conversations/service";
import useConversation from "@/app/hooks/useConversation";
import BodySkeleton from "./skeleton/bodySkeleton";

function Body() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, message } = useMessageStore();
  const { user } = useUserStore();
  const { conversation } = useConversationStore();
  const { conversationId } = useConversation();
  const { conversationUser } = useConversationUser(conversation, user);

  useEffect(() => {
    getMessagesByChatId(conversationId);
  }, []);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, [messages, isLoading]);

  return (
    <div
      className="
      pt-10
      flex-1 
      overflow-y-auto
      scrollbar-thin
      scrollbar-thumb-gray-500
      px-3
      py-2
      space-y-2"
    >
      {isLoading==='all' ?
      <BodySkeleton/>
      :
        messages?.map((item,index) =>
          item.messageSentBy == user?._id ? (
            <div
              key={item._id}
              className="
              flex 
              flex-row 
              items-start
              justify-start 
              space-x-1
              w-full 
            "
            >
              <div
                className="
                flex 
                flex-col
                items-end 
                w-full
              "
              >
                <H5 title="You" />
                <H5
                  title={item?.body || ""}
                  className="bg-accent text-start py-[7px] px-3 rounded-md mt-1 max-w-[50%] overflow-x-auto h-auto"
                />
              </div>
            </div>
          ) : (
            <div
              key={item._id}
              className="
              flex 
              flex-row 
              items-start
              justify-start 
              space-x-1
              w-full 
            "
            >
              <div
                className="
                flex 
                flex-col
                items-start 
                w-full
              "
              >
                <H5
                  title={
                    conversationUser?.fullName || conversationUser?.email || "N/A"
                  }
                />
                <H5
                  title={item?.body || ""}
                  className="bg-accent text-start py-[7px] px-3 rounded-md mt-1 max-w-[50%]"
                />
              </div>
            </div>
          ))
      }

      <div className="pt-2" ref={bottomRef} />
    </div>
  );
}

export default React.memo(Body);
