import { useActionState, useEffect, useState } from 'react';
import './App.css'
import type { Attendee } from './types/Attendee';
import { socket } from './socket.ts';
import { useWebhookStatus } from './hooks/useWebsocketStatus.ts';

async function addAttendeeAction(prevState: { success: boolean, message: string }, formData: FormData): Promise<{ success: boolean, message: string }> {

  try {
    const response = await fetch("/api/attendee-signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: formData.get('eventId'),
        name: formData.get('name'),
        email: formData.get('email'),
      }),
    });

    if (response.status == 204) {
      return {
        success: true,
        message: 'All Good.'
      }
    } else {
      const json = await response.json();
      return {
        success: false,
        message: json.message ?? 'Oops! Something went wrong!'
      }
    }

  } catch (e) {
    return {
      success: false,
      message: 'Oops! Something went wrong!'
    }
  }

}

function App({ eventId }: {eventId: number}) {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [formState, formAction, isPending] = useActionState(addAttendeeAction, { success: true, message: '' });
  const isOnline = useWebhookStatus();

  useEffect(() => {
    const  addAttendee = (payload: Attendee) => {
      setAttendees((curr) => {
        return [...curr, payload];
      });
    }
    const addAllAttendees = (payload: Attendee[]) => {
      setAttendees([...payload]);
    }

    const removeAttendee = (payload: Attendee) => {
      setAttendees((curr) => {
        return curr.filter((el) => el.id != payload.id)
      });
    }

    socket.on('attendee:initialize', addAllAttendees);
    socket.on('attendee:signin', addAttendee);
    socket.on('attendee:signout', removeAttendee);

    return () => {
      socket.off('attendee:signin', addAttendee);
      socket.off('attendee:initialize', addAllAttendees);
      socket.off('attendee:signout', removeAttendee);
    }
  }, []);

  const handleLeave = (payload: Attendee) => {
    fetch("/api/attendee-signout", {
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
    <>
      <header>
        <h1>Websocket Attendee Demo <div title={isOnline ? 'Online' : 'Offline'} className={isOnline ? 'online' : ''} id="status-bubble">&nbsp;</div></h1>
      </header>
      <div id="main">
        <form action={formAction}>
          <div id="error-alert" className={formState.success === false ? 'active' : ''}>
            {formState.message}
          </div>
          <div className="input-group">
            <label htmlFor="event-input" className="form-label">Event ID</label>
            <input type="number" name="eventId" required className="form-control" id="event-input" />
          </div>
          <div className="input-group">
            <label htmlFor="email-input" className="form-label">Email address</label>
            <input type="email" name="email" required className="form-control" id="email-input" placeholder="name@example.com" />
          </div>
          <div className="input-group">
            <label htmlFor="name-input" className="form-label">Name</label>
            <input type="text" name="name" required className="form-control" id="name-input" placeholder="John Doe" />
          </div>
          <button disabled={isPending}>Add Attendee</button>
        </form>
        <div id="list-container">
          <h2>Attendee List</h2>
          <ul id="attendee-list">
            {attendees.length === 0 && <li>No Attendees Yet.</li>}
            {attendees.map((attendee: Attendee) =>
              (<li key={attendee.id}>{attendee.name} <button onClick={() => handleLeave(attendee)}>Leave</button></li>)
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
