import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Attendee } from '../types/Attendee';
import type { Poll } from '../types/Poll';
const wsUrl = 'ws://' + window.location.hostname + ':' + window.location.port;
export const socket = io(wsUrl, {path: '/api/socket.io'});

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
