import eventManager from '../EventManager.ts';
import { eventBus } from '../utils/eventBus.ts';
import type { SessionSocket } from "../types/SocketSession.ts";

const handler = async (socket: SessionSocket, eventId: number) => {
  socket.emit('attendee:initialize', await eventManager.getAttendees(eventId));

  eventBus.on('attendee:signin', (payload) => {
    if (payload.eventId == eventId) {
      socket.emit('attendee:signin', payload.attendee);
    }
  });

  eventBus.on('attendee:signout', (payload) => {
    if (payload.eventId == eventId) {
      socket.emit('attendee:signout', { id: payload.attendeeId });
    }
  });
};

export {handler as attendeeHandler};