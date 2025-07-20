import { redisClient } from "./redisClient.ts";
import type { Attendee } from "./types/Attendee.ts";
import type { Event } from "./types/Event.ts";
import type { Poll } from "./types/Poll.ts";

class EventManager {
  public async exists(eventId: number | undefined): Promise<boolean> {
    if (typeof (eventId) === 'undefined') {
      return false;
    }
    return await this.getEvent(eventId) !== null;
  }

  public addEvent(eventId: number, event: Event) {
    redisClient.set('event:' + eventId.toString(), JSON.stringify(event));
  }

  public async addAttendee(eventId: number, attendee: Attendee): Promise<number> {
    const event = await this.getEvent(eventId);
    if (null === event) {
      return -1;
    }

    const attendees = await this.getAttendees(eventId);
    if (attendees.findIndex((curr: Attendee) => curr.email === attendee.email) !== -1) {
      return -1;
    }

    event.maxAttendeeId++;
    attendee.id = event.maxAttendeeId;
    attendees.push(attendee);
    event.attendees = attendees;

    redisClient.set('event:' + eventId.toString(), JSON.stringify(event));
    return attendee.id;
  }

  public async addPoll(eventId: number, poll: Poll): Promise<number> {
    const event = await this.getEvent(eventId);
    if (null === event) {
      return -1;
    }

    const polls = await this.getPolls(eventId);

    event.maxPollId++;
    poll.id = event.maxPollId;
    polls.push(poll);
    event.polls = polls;
    redisClient.set('event:' + eventId.toString(), JSON.stringify(event));

    return poll.id;
  }

  public async addPollVote(eventId: number, userId: number, pollId: number, answer: string): Promise<boolean> {
    const event = await this.getEvent(eventId);
    if (null === event) {
      return false;
    }

    let answered = false;
    let polls = await this.getPolls(eventId);
    polls = polls.map((poll) => {
      if (poll.id == pollId) {
        poll.answers = poll.answers.map((ans) => {
          if (ans.option == answer) {
            ans.voters.push(userId);
            answered = true;
          }

          return ans;
        });
      }

      return poll;
    });

    if(!answered) {
      return false;
    }

    event.polls = polls;
    redisClient.set('event:' + eventId.toString(), JSON.stringify(event));

    return true;
  }

  public async getAttendees(eventId: number): Promise<Attendee[]> {
    const event = await this.getEvent(eventId);

    return event?.attendees ?? [];
  }

  public async getPolls(eventId: number): Promise<Poll[]> {
    const event = await this.getEvent(eventId);

    return event?.polls ?? [];
  }

  public async removeAttendee(eventId: number, attendeeId: number): Promise<boolean> {
    const event = await this.getEvent(eventId);
    if (null === event) {
      return false;
    }

    let attendees = await this.getAttendees(eventId);
    const indexToRemove = attendees.findIndex((curr: Attendee) => curr.id === attendeeId);
    if (indexToRemove === -1) {
      return false;
    }

    attendees = attendees.filter((curr: Attendee) => curr.id !== attendeeId);
    event.attendees = attendees;

    redisClient.set('event:' + eventId.toString(), JSON.stringify(event));
    return true;
  }

  private async getEvent(eventId: number): Promise<Event | null> {
    const res = await redisClient.get('event:' + eventId.toString());
    if (res && res.length > 0) {
      return JSON.parse(res.toString());
    }

    return null;
  }
}

const eventManager = new EventManager();

export default eventManager;