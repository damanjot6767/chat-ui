'use client'
import { io as ClientIO } from "socket.io-client";
import { useContext, useEffect, useState, createContext } from "react";
import { getCookie } from "cookies-next";
import { Toaster } from "@/app/lib/toast";
import { ChatEventEnum } from "@/app/lib/constant";

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

    useEffect(() => {
        const socketInstance = new WebSocket("ws://localhost:8000");
    
        socketInstance.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
            socketInstance.send(JSON.stringify({ event: ChatEventEnum.CONNECTED_EVENT, token: getCookie('accessToken') }));
            setSocket(socketInstance);
        };
    
        socketInstance.onclose = () => {
            console.log('WebSocket disconnected');
        };
    
        socketInstance.onmessage = (event) => {
            console.log('Received data:', event.data);
            // Handle incoming messages here
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