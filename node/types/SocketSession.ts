import type { IncomingMessage } from 'http';
import type { SessionData } from 'express-session';
import type { Socket } from 'socket.io'

declare module "express-session" {
  interface SessionData {
    eventId: number | undefined;
    userId: number;
    isAdmin: boolean;
  }
}

interface SessionIncomingMessage extends IncomingMessage {
    session: SessionData;
}

export interface SessionSocket extends Socket {
    request: SessionIncomingMessage;
}