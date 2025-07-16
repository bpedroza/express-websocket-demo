import express from "express";
import eventManager from '../EventManager.ts';
import { eventBus } from '../utils/eventBus.ts';

const router = express.Router();

router.post('/check-in', express.json(), async (req, res) => {
  const eventId = req.body.eventId ?? undefined;
  const attendee = {
    id: -1,
    email: req.body.email,
    name: req.body.name
  };
  const id = await eventManager.addAttendee(eventId, attendee);

  if (id !== -1) {
    eventBus.emit('attendee:signin', { eventId: req.body.eventId, attendee });
    const isAdmin = req.session.isAdmin ?? false;
    if (!isAdmin) {
      req.session.userId = id;
      req.session.eventId = eventId;
      req.session.isAdmin = req.body.isAdmin ?? false;
    }
    return res.status(204).send();
  }

  return res.status(422).json({ 'message': 'Invalid Event ID' });
});

router.post('/signout', express.json(), (req, res) => {
  const eventId = req.body.eventId ?? -1;
  const attendeeId = req.body.attendeeId ?? -1;
  if (eventManager.removeAttendee(eventId, attendeeId)) {
    eventBus.emit('attendee:signout', { eventId: req.body.eventId, attendeeId });
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error logging out' });
      } else {
        res.json({ message: 'Logged out successfully' });
      }
    });
  }

  return res.status(422).json({ 'message': 'Invalid Event or Attendee ID' });
});

export { router as attendeeRouter };