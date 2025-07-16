import { useContext} from 'react';
import { useParams } from 'react-router';
import AttendeeList from '../components/AttendeeList.tsx';
import { SocketContext } from '../context/SocketContext.ts';
import CheckInForm from '../components/CheckInForm.tsx';

function EventAdmin() {
  const { eventId = '-1' } = useParams<'eventId'>();
  const { attendees } = useContext(SocketContext);

  return (
    <>
      <h1>Websocket Attendee Demo</h1>
      <div id="main">
        <CheckInForm eventId={eventId} buttonText='Add Attendee' />
        <div id="list-container">
          <h2>Attendee List</h2>
          <AttendeeList attendees={attendees} eventId={eventId} canRemove={true} />
        </div>
      </div>
    </>
  )
}

export default EventAdmin
