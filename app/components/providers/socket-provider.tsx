'use client'
import { io as ClientIO } from "socket.io-client";
import { useContext, useEffect, useState, createContext } from "react";
import { getCookie } from "cookies-next";
import { Toaster } from "@/app/lib/toast";
import { ChatEventEnum } from "@/app/lib/constant";
import useMessageStore from "@/app/store/message-store";

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
})

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [socket, setSocket] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { setMesssage, setTyping } = useMessageStore();

    useEffect(() => {
        const socketInstance = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_CONNECTION_URL || "");
    
        socketInstance.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
            socketInstance.send(JSON.stringify({ event: ChatEventEnum.CONNECTED_EVENT, token: getCookie('accessToken') }));
            setSocket(socketInstance);
        };
    
        socketInstance.onclose = (err) => {
            console.log('WebSocket disconnected', err);
        };
    
        socketInstance.onmessage = (res: any) => {
            console.log("47")
            const data = JSON.parse(res.data);
            if(data.event===ChatEventEnum.TYPING_EVENT){
              setTyping(data.data.typing?data.data.chatId:null)
            }
    
            else if(data.event===ChatEventEnum.MESSAGE_RECEIVED_EVENT){
              setMesssage(data.data)
            }
        };
    
        return () => {
            if (socketInstance) {
                socketInstance.close();
            }
        };
    }, []);


    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}