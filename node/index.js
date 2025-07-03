import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { EventEmitter } from 'node:events';

const app = express();
const server = createServer(app);
const ws = new Server(server);
const eventBus = new EventEmitter();
let maxId = 23;
const events = {
  1: {
    attendees: [{
        id: 1,
        email: 'johndoe@example.com',
        name: 'John Doe',
      },
      {
        id: 3,
        email: 'bgates@example.com',
        name: 'Bill Gates',
      },
      {
        id: 12,
        email: 'sjobs@example.com',
        name: 'Steve Jobs',
      },
      {
        id: 19,
        email: 'scooby@example.com',
        name: 'Scooby Doo',
      },
      {
        id: 22,
        email: 'bbuilder@example.com',
        name: 'Bobby The Builder',
      },
    ]
  },
  17: {
    attendees: [{
      id: 2,
      email: 'janedoe@example.com',
      name: 'Jane Doe',
    }]
  }
};

app.post('/attendee-signin', express.json(), (req, res) => {
  const eventId = req.body.eventId ?? -1;
  if(eventExists(eventId)) {
    maxId++;
    const attendee = {
      id: maxId,
      email: req.body.email,
      name: req.body.name
    };
    events[eventId].attendees.push(attendee);
    eventBus.emit('attendee:signin', {eventId:req.body.eventId, attendee});
    return res.status(204).send();
  }
  
  return res.status(422).json({'message': 'Invalid Event ID'});
});

app.post('/attendee-signout', express.json(), (req, res) => {
  const eventId = req.body.eventId ?? -1;
  const attendeeId = req.body.attendeeId ?? -1;
  if(eventExists(eventId)) {
    const idx = events[eventId].attendees.findIndex((attendee) => attendee.id == attendeeId);
    if(idx !== -1) {
      events[eventId].attendees.splice(idx, 1);
      eventBus.emit('attendee:signout', {eventId:req.body.eventId, attendeeId});
      return res.status(204).send();
    }
    
    return res.status(422).json({'message': 'Invalid Attendee ID'});
  }
  
  return res.status(422).json({'message': 'Invalid Event ID'});
});

ws.on('connection', (socket) => {
    const eventId = socket.handshake.query.eventId ?? -1;
    console.log('A user connected for event: ' + eventId);
    if(eventExists(eventId)) {
      socket.emit('attendee:initialize', events[eventId].attendees);
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

function eventExists(eventId) {
  return typeof(events[eventId]) !== 'undefined';
}