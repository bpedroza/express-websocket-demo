import type { Attendee } from "./Attendee.ts";
import type { Poll } from "./Poll.ts";

export type Event = {
    maxAttendeeId: number;
    maxPollId: number;
    attendees: Attendee[];
    polls: Poll[];
}