import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Attendee } from '../types/Attendee';
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('event') ?? 1;
const wsUrl = 'ws://' + window.location.hostname + ':' + window.location.port;
export const socket = io(wsUrl, {query: {eventId}, path: '/api/socket.io'});

export type SocketContextProps = {
    socket: Socket;
    isConnected: boolean;
    attendees: Attendee[];
    polls: string[];
}

export const SocketContext = createContext<SocketContextProps>({
    socket,
    isConnected: false,
    attendees: [],
    polls: []
});
