import { useEffect, useState } from 'react';
import { socket } from '../socket.ts';

export function useWebhookStatus() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    socket.io.on("error", () => setIsOnline(false));
    socket.on("connect", () => setIsOnline(true));
    socket.on("disconnect", () => setIsOnline(false));

    return () => {
      socket.io.off("error", () => setIsOnline(false));
      socket.off("connect", () => setIsOnline(true));
      socket.off("disconnect", () => setIsOnline(false));
    }
  }, []);

  return isOnline;
}