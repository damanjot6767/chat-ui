import { create } from 'zustand';
import { persist } from "zustand/middleware";
import { MesssageModal } from '../(main)/lib/conversations/message-model'


interface MesssageState {
    isLoading: boolean | string,
    message: MesssageModal | null,
    messages: MesssageModal[] | null,
    typing: null | string,
    setLoading: (value: boolean | string) => void,
    setMesssage: (data: MesssageModal) => void,
    setIndividualMessage: (data: any) => void,
    setMesssages: (data: MesssageModal[]) => void,
    setTyping: (Id: null | string) => void,
}

const useMessageStore = create<MesssageState>()(persist(
    (set) => ({
        isLoading: false,
        message: null,
        messages: null,
        typing: null,
        setLoading: (value) => set((state) => ({ isLoading: value })),
        setIndividualMessage: (value) => set((state)=>({messages: state.messages?.length? [...state.messages,value]: [value]})),
        setMesssage: (data) => {
            return set((state) => {
                let newMessages = state.messages;
                if(newMessages?.length){
                    newMessages.push(data);
                }
                else{
                    newMessages = [data];
                }
                return { 
                    isLoading: false, 
                    messages: newMessages
                }
            })
        } ,
        setMesssages: (data) => set((state) => ({ isLoading: false, messages: data })),
        setTyping: (value) => set((state) => ({ typing: value }))
    }),
    {
        name: 'message store'
    }
))

export const {setMesssages, setIndividualMessage, setMesssage, setLoading} = useMessageStore.getState();
export default useMessageStore