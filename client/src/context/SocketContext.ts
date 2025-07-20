import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Attendee } from '../types/Attendee';
import type { Poll } from '../types/Poll';
const wsUrl = import.meta.env.VITE_WS_URL;
export const socket = io(wsUrl, {path: import.meta.env.VITE_WS_PATH});

export type SocketContextProps = {
    socket: Socket;
    isConnected: boolean;
    eventIsValid: boolean;
    attendees: Attendee[];
    polls: Poll[];
}

export const SocketContext = createContext<SocketContextProps>({
    socket,
    isConnected: false,
    eventIsValid: true,
    attendees: [],
    polls: []
});
