import express from "express";
import EventManager from '../EventManager.ts';
import { eventBus } from '../utils/eventBus.js';

const router = express.Router();
const eventManager = new EventManager();

router.post('/signin', express.json(), (req, res) => {
  const eventId = req.body.eventId ?? -1;
  const attendee = {
    id: -1,
    email: req.body.email,
    name: req.body.name
  };

  if (eventManager.addAttendee(eventId, attendee)) {
    eventBus.emit('attendee:signin', { eventId: req.body.eventId, attendee });
    return res.status(204).send();
  }

  return res.status(422).json({ 'message': 'Invalid Event ID' });
});

router.post('/signout', express.json(), (req, res) => {
  const eventId = req.body.eventId ?? -1;
  const attendeeId = req.body.attendeeId ?? -1;
  if (eventManager.removeAttendee(eventId, attendeeId)) {
      eventBus.emit('attendee:signout', { eventId: req.body.eventId, attendeeId });
      return res.status(204).send();
  }

  return res.status(422).json({ 'message': 'Invalid Event or Attendee ID' });
});

export { router as attendeeRouter };