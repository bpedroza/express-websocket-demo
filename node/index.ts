import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { attendeeRouter } from './routes/attendees.ts';
import { attendeeHandler } from './socket_handlers/attendees.ts';
import eventManager from './EventManager.ts';
import EventSeeder from './EventSeeder.ts';
import session from "express-session";
import type { SessionSocket } from './types/SocketSession.ts';
import { pollRouter } from './routes/polls.ts';
import { pollHandler } from './socket_handlers/polls.ts';

const app = express();
const server = createServer(app);
const ws = new Server(server);
const sessionMiddleware = session({
  secret: 'itsMyLittleSecret',
  cookie: {},
  saveUninitialized: false
});
app.use(sessionMiddleware);
ws.engine.use(sessionMiddleware);

// For development only.
EventSeeder.seed();

app.use('/attendee', attendeeRouter);
app.use('/poll', pollRouter);

ws.on('connection', async (socket: SessionSocket) => {
    const eventId = socket.request.session.eventId;
    const exists = await eventManager.exists(eventId);
    console.log('A user attempted to connect for event: ' + eventId);
    if(exists) {
      attendeeHandler(socket, eventId);
      pollHandler(socket, eventId);
    } else {
      socket.emit('event:invalid');
      socket.disconnect();
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});