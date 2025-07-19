import eventManager from '../EventManager.ts';
import { eventBus } from '../utils/eventBus.ts';
import type { SessionSocket } from "../types/SocketSession.ts";

const handler = async (socket: SessionSocket, eventId: number) => {
  socket.emit('poll:initialize', await eventManager.getPolls(eventId));

  eventBus.on('poll:created', (payload) => {
      if (payload.eventId == eventId) {
        socket.emit('poll:created', payload.poll);
      }
    });
};

export {handler as pollHandler};