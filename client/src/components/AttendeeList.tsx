import type { Attendee } from '../types/Attendee';

function AttendeeList({ attendees, eventId = '-1', canRemove }: {attendees: Attendee[], eventId?: string, canRemove: boolean}) {
    const handleLeave = (payload: Attendee) => {
        fetch("/api/attendee/check-out", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                eventId: eventId,
                attendeeId: payload.id
            }),
        });
    }

    return (
        <ul id="attendee-list">
            {attendees.length === 0 && <li>No Attendees Yet.</li>}
            {attendees.map((attendee: Attendee) =>
                (
                    <li key={attendee.id}>
                        {attendee.name} 
                        { canRemove && <button className="sm" onClick={() => handleLeave(attendee)}>Leave</button> }
                    </li>
                )
            )}
        </ul>
    )
}

export default AttendeeList
