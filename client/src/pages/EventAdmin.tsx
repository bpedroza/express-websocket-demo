import { useActionState, useContext} from 'react';
import { useParams } from 'react-router';
import AttendeeList from '../components/AttendeeList.tsx';
import { SocketContext } from '../context/SocketContext.ts';

async function addAttendeeAction(prevState: { success: boolean, message: string }, formData: FormData): Promise<{ success: boolean, message: string }> {

  try {
    const response = await fetch("/api/attendee/signin", {
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

function EventAdmin() {
  const { eventId = '-1' } = useParams<'eventId'>();
  const [formState, formAction, isPending] = useActionState(addAttendeeAction, { success: true, message: '' });
  const { attendees } = useContext(SocketContext);

  return (
    <>
      <h1>Websocket Attendee Demo</h1>
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
          <AttendeeList attendees={attendees} eventId={eventId} canRemove={true} />
        </div>
      </div>
    </>
  )
}

export default EventAdmin
