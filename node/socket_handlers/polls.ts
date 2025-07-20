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

  eventBus.on('poll:updated', async (payload) => {
    // Send all polls out - might want to update this later. need to think about it.
    if (payload.eventId == eventId) {
      socket.emit('poll:initialize', await eventManager.getPolls(eventId));
    }
  });
};

export { handler as pollHandler };