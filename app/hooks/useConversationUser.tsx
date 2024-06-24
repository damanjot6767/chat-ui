import { useMemo } from "react"
import { ConversationModal } from "../(main)/lib/conversations/conversation-model";
import { UserModel } from "../(main)/lib/users/user-model";


export const useConversationUser = (conversation: ConversationModal | null, user: UserModel | null) => {

    const conversationUser = 
    useMemo(() =>
        conversation?.users?.find(
            (item) => item._id !== user?._id)
        , [conversation, user]
    )

    return { conversationUser };
}