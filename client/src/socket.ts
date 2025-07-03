import { io } from 'socket.io-client';
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('event') ?? 1;
const wsUrl = 'ws://' + window.location.hostname + ':' + window.location.port;
export const socket = io(wsUrl, {query: {eventId}, path: '/api/socket.io'});