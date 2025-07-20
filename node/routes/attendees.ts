import express from "express";
import eventManager from '../EventManager.ts';
import { eventBus } from '../utils/eventBus.ts';
import type { User } from "../types/User.ts";

const router = express.Router();

router.post('/check-in', express.json(), async (req, res) => {
  const eventId = req.body.eventId ?? undefined;
  const attendee = {
    id: -1,
    email: req.body.email,
    name: req.body.name
  };
  attendee.id = await eventManager.addAttendee(eventId, attendee);

  if (attendee.id !== -1) {
    eventBus.emit('attendee:signin', { eventId: req.body.eventId, attendee });
    const isAdmin = req.session.isAdmin ?? false;
    if (!isAdmin) {
      req.session.userId = attendee.id;
      req.session.eventId = eventId;
      req.session.isAdmin = req.body.isAdmin;
    }

    const resp: User = {
      id: attendee.id,
      eventId,
      isAdmin: req.body.isAdmin,
      name: attendee.name,
      email: attendee.email
    };
    return res.json(resp);
  }

  return res.status(422).json({ 'message': 'Invalid Event ID' });
});

router.post('/check-out', express.json(), async (req, res) => {
  const eventId = req.body.eventId ?? -1;
  const attendeeId = req.body.attendeeId ?? -1;
  const isAdmin = req.session.isAdmin ?? false;

  if(!isAdmin && attendeeId != req.session.userId) {
    return res.status(403).send();
  }

  const removed = await eventManager.removeAttendee(eventId, attendeeId);

  if (removed) {
    eventBus.emit('attendee:signout', { eventId: req.body.eventId, attendeeId });
    
    if (attendeeId == req.session.userId) {
      return req.session.destroy(err => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error logging out' });
        } else {
          return res.json({ message: 'Logged out successfully' });
        }
      });
    } else {
      return res.json({ message: 'Attendee Removed.' });
    }
  }

  return res.status(422).json({ 'message': 'Invalid Event or Attendee ID' });
});

export { router as attendeeRouter };