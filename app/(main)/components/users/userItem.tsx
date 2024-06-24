import React from "react";
import Avatar from "./avatar";
import { H4, H5 } from "@/components/ui/typograpgy";
import { UserModel } from "../../lib/users/user-model";
import { createConversation } from "../../lib/conversations/service";
import { useRouter } from "next/navigation";
import { ChatType } from "../../lib/conversations/contant";
import useConversationStore from "@/app/store/conversation-store";

interface UserItemProps {
  user: UserModel
}

function UserItem({ user }: UserItemProps) {
  const router = useRouter();
  const {
    setLoading,
    isLoading,
    setConversation,
  } = useConversationStore()

  const handleClick = () => {
    createConversation(
      { chatType: ChatType.INDIVIDUAL,
        userIds: [user._id]},
      setConversation,
      setLoading,
      router.push
    )
  }
  return (
    <div
      className="
      flex 
      flex-row 
      items-center 
      space-x-2 
      p-2 
      hover:bg-background 
      rounded-md
      transition-all"
      onClick={handleClick}
    >
      <Avatar />
      <div
        className="
        flex 
        flex-col 
      ">
        <H4 title={user.fullName} />
        <H5 title={user.email} />
      </div>
    </div>
  );
}

export default React.memo(UserItem);
