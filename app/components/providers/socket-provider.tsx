'use client'
import { useContext, useEffect, useState, createContext, useRef } from "react";
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

    const conversationRef = useRef(conversation);
    const conversationsRef = useRef(conversations);

    const handleSocketEvent = (data: any) => {
        if (data.event === ChatEventEnum.TYPING_EVENT) {
            const newdata = conversationsRef.current?.map((ele) => ele._id === data.data.chatId ? { ...ele, isTyping: data.data.typing } : ele);
            console.log("31", conversationsRef)
            if (newdata) setConversations(newdata);
            if (conversationRef.current) {
                setConversation({ ...conversationRef.current, isTyping: data.data.typing });
            }
        } else if (data.event === ChatEventEnum.MESSAGE_RECEIVED_EVENT) {
            setMesssage(data.data);
            const newdata = conversationsRef.current?.map((ele) => ele._id === data.data.chatId ? { ...ele, isNewMessage: data.data } : ele);
            if (newdata) setConversations(newdata);
            if (conversationRef.current) {
                setConversation({ ...conversationRef.current, isNewMessage: data.data });
            }
        }
    }

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
                handleSocketEvent(data);
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
        if (conversation) {
            conversationRef.current = conversation
        }
        if (conversations) {
            conversationsRef.current = conversations
        }
    }, [conversation, conversations])

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
}
