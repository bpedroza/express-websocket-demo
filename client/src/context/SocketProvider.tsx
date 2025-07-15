import type React from 'react';
import { SocketContext, socket } from './SocketContext';
import { useEffect, useState } from 'react';
import type { Attendee } from '../types/Attendee';

export type SocketProviderProps = {
    children: React.ReactNode
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [polls, setPolls] = useState<string[]>([]);

    useEffect(() => {
        socket.io.on("error", () => setIsConnected(false));
        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));

        socket.on('attendee:initialize', (payload: Attendee[]) => {
            setAttendees([...payload]);
        });
        socket.on('attendee:signin', (payload: Attendee) => {
            setAttendees((curr: Attendee[]) => {
                return [...curr, payload];
            });
        });
        socket.on('attendee:signout', (payload: Attendee) => {
            setAttendees((curr: Attendee[]) => {
                return curr.filter((el) => el.id != payload.id)
            });
        });

        return () => {
            socket.io.off("error");
            socket.off("connect");
            socket.off("disconnect");
            socket.off("attendee:initialize");
            socket.off("attendee:signin");
            socket.off("attendee:signout");
        }
    }, []);

    const contextValue = {
        socket,
        isConnected,
        attendees,
        polls
    };

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    )
};