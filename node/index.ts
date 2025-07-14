import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { eventBus } from './utils/eventBus.js';
import { attendeeRouter } from './routes/attendees.ts';
import EventManager from './EventManager.ts';
import EventSeeder from './EventSeeder.ts';

const app = express();
const server = createServer(app);
const ws = new Server(server);
const eventManager = new EventManager();
// For development only.
EventSeeder.seed();

app.use('/attendee', attendeeRouter);

ws.on('connection', async (socket) => {
    const eventId = parseInt(socket.handshake.query.eventId?.toString() ?? '-1');
    const exists = await eventManager.exists(eventId);
    console.log('A user connected for event: ' + eventId);
    if(exists) {
      socket.on('event:initialize', async () => {
        socket.emit('attendee:initialize', await eventManager.getAttendees(eventId));
      })
      
      eventBus.on('attendee:signin', (payload) => {
        if(payload.eventId == eventId) {
          socket.emit('attendee:signin', payload.attendee);
        }
      });

      eventBus.on('attendee:signout', (payload) => {
        if(payload.eventId == eventId) {
          socket.emit('attendee:signout', {id: payload.attendeeId});
        }
      });
    } else {
      socket.emit('event:invalid');
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});