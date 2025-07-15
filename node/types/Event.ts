import type { Attendee } from "./Attendee.ts";

export type Event = {
    maxAttendeeId: number;
    attendees: Attendee[];
}