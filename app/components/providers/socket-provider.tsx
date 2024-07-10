'use client'
import { useContext, useEffect, useState, createContext } from "react";
import { getCookie } from "cookies-next";
import { ChatEventEnum } from "@/app/lib/constant";
import useMessageStore from "@/app/store/message-store";
import useConversationStore from "@/app/store/conversation-store";

type SocketContextType = {
    socket: WebSocket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
})

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { setMesssage } = useMessageStore();
    const { conversations, setConversations, conversation, setConversation } = useConversationStore();

    useEffect(() => {
        let socketInstance: WebSocket | null = null;

        const connectWebSocket = () => {
            socketInstance = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_CONNECTION_URL || "");

            socketInstance.onopen = () => {
                console.log('WebSocket connected');
                setIsConnected(true);
                socketInstance?.send(JSON.stringify({ event: ChatEventEnum.CONNECTED_EVENT, token: getCookie('accessToken') }));
                setSocket(socketInstance);
            };

            socketInstance.onclose = (err) => {
                console.log('WebSocket disconnected', err);
                setIsConnected(false);
                setTimeout(() => {
                    console.log('Attempting to reconnect WebSocket...');
                    connectWebSocket(); // Recreate WebSocket connection
                }, 5000); // Adjust delay as needed
            };

            socketInstance.onmessage = (res: MessageEvent) => {
                const data = JSON.parse(res.data);
                if (data.event === ChatEventEnum.TYPING_EVENT) {
                    console.log("53",conversations)
                    const newdata = conversations?.map((ele) => ele._id === data.data.chatId ? { ...ele, isTyping: data.data.typing } : ele);
                    if (newdata) setConversations(newdata);
                    if (conversation) {
                        setConversation({ ...conversation, isTyping: data.data.typing });
                    }
                } else if (data.event === ChatEventEnum.MESSAGE_RECEIVED_EVENT) {
                    setMesssage(data.data);
                    const newdata = conversations?.map((ele) => ele._id === data.data.chatId ? { ...ele, isNewMessage: data.data } : ele);
                    if (newdata) setConversations(newdata);
                    if (conversation) {
                        setConversation({ ...conversation, isNewMessage: data.data });
                    }
                }
            };

            socketInstance.onerror = (err) => {
                console.error('WebSocket error:', err);
            };
        };

        connectWebSocket();

        return () => {
            if (socketInstance) {
                socketInstance.close();
            }
        };
    }, []);

    useEffect(() => {
        if (conversation) setConversation(conversation);
        if (conversations) setConversations(conversations);
    }, [conversation, conversations, setConversation, setConversations]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
}
