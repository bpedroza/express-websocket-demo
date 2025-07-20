import express from "express";
import eventManager from '../EventManager.ts';
import { eventBus } from '../utils/eventBus.ts';

const router = express.Router();

router.post('/', express.json(), async (req, res) => {
  const isAdmin = req.session.isAdmin ?? false;
  const eventId = req.session.eventId;
  if (!isAdmin) {
    return res.status(403).send();
  }
  const poll = {
    id: -1,
    question: req.body.question,
    options: req.body.options,
    answers: req.body.options.map((opt: string) => { return { option: opt, count: 0 }; })
  };
  poll.id = await eventManager.addPoll(eventId, poll);

  if (poll.id !== -1) {
    eventBus.emit('poll:created', { eventId: eventId, poll });
    return res.status(204).send();
  }

  return res.status(422).json({ 'message': 'Invalid Event ID' });
});

router.post('/vote', express.json(), async (req, res) => {
  const eventId = req.session.eventId;
  const userId = req.session.userId;
  const pollId = req.body.pollId;
  const answer = req.body.answer;

  const success = await eventManager.addPollVote(eventId, userId, pollId, answer);
  if (success) {
    eventBus.emit('poll:updated', { eventId });

    return res.status(204).send();
  }

  return res.status(422).json({ 'message': 'Invalid Event ID, Poll ID, or answer' });
});

export { router as pollRouter };