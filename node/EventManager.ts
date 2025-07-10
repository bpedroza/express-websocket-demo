import { redisClient } from "./redisClient.ts";
import type { Attendee } from "./types/Attendee.ts";
import type { Event } from "./types/Event.ts";

export default class EventManager {
    public async exists(eventId: number): Promise<boolean> {
        return await this.getEvent(eventId) !== null;
    }

    public addEvent(eventId: number, event: Event) {
        redisClient.set('event:' + eventId.toString(), JSON.stringify(event));
    }

    public async addAttendee(eventId: number, attendee: Attendee): Promise<boolean> {
        const event = await this.getEvent(eventId);
        if(null === event) {
            return false;
        }

        const attendees = await this.getAttendees(eventId);
        if(attendees.findIndex((curr: Attendee) => curr.email === attendee.email) !== -1) {
            return false;
        }

        event.maxAttendeeId++;
        attendee.id = event.maxAttendeeId;
        attendees.push(attendee);
        event.attendees = attendees;

        redisClient.set('event:' + eventId.toString(), JSON.stringify(event));
        return true;
    }

    public async getAttendees(eventId: number): Promise<Attendee[]> {
        const event = await this.getEvent(eventId);

        return event?.attendees ?? [];
    }

    public async removeAttendee(eventId: number, attendeeId: number): Promise<boolean> {
        const event = await this.getEvent(eventId);
        if(null === event) {
            return false;
        }

        let attendees = await this.getAttendees(eventId);
        const indexToRemove = attendees.findIndex((curr: Attendee) => curr.id === attendeeId);
        if(indexToRemove === -1) {
            return false;
        }

        attendees = attendees.filter((curr: Attendee) => curr.id !== attendeeId);
        event.attendees = attendees;

        redisClient.set('event:' + eventId.toString(), JSON.stringify(event));
        return true;
    }

    private async getEvent(eventId: number): Promise<Event|null>
    {
        console.log('event:' + eventId.toString());
        const res = await redisClient.get('event:' + eventId.toString());
        console.log(res);
        if(res && res.length > 0) {
            return JSON.parse(res.toString());
        }

        return null;
    }
}