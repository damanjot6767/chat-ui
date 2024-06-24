import { create } from 'zustand'
import { ConversationModal } from '../(main)/lib/conversations/conversation-model'
import { persist } from "zustand/middleware"


interface ConversationState {
    isLoading: boolean,
    conversation: ConversationModal | null,
    conversations: ConversationModal[] | null,
    setLoading: (value: boolean) => void,
    setConversation: (data: ConversationModal | null) => void,
    setConversations: (data: ConversationModal[]) => void,
}

const useConversationStore = create<ConversationState>()(persist(
    (set) => ({
        isLoading: false,
        conversation: null,
        conversations: null,
        setLoading: (value) => set((state) => ({ isLoading: value })),
        setConversation: (data) => set((state) => ({ isLoading: false, conversation: data })),
        setConversations: (data) => set((state) => ({ isLoading: false, conversations: data }))
    }),
    {
        name: 'conversation store'
    }
))

export default useConversationStore