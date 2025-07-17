import express from "express";
import eventManager from '../EventManager.ts';
import { eventBus } from '../utils/eventBus.ts';

const router = express.Router();

router.post('/', express.json(), async (req, res) => {
  const isAdmin = req.session.isAdmin ?? false;
  const eventId = req.session.eventId;
  if(!isAdmin) {
    return res.status(403).send();
  }
  const poll = {
    id: -1,
    question: req.body.question,
    options: req.body.options,
    answers: req.body.options.map((opt: string) => { return { option: opt, count: 0}; })
  };
  poll.id = await eventManager.addPoll(eventId, poll);

  if (poll.id !== -1) {
    eventBus.emit('poll:created', { eventId: eventId, poll });
    return res.status(204).send();
  }

  return res.status(422).json({ 'message': 'Invalid Event ID' });
});

export { router as pollRouter };