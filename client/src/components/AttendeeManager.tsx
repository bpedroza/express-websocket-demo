import { useContext } from "react";
import { useParams } from "react-router";
import { SocketContext } from "../context/SocketContext";
import CheckInForm from "./CheckInForm";
import AttendeeList from "./AttendeeList";

function AttendeeManager() {
  const { eventId = '-1' } = useParams<'eventId'>();
  const { attendees } = useContext(SocketContext);
  return (
    <>
      <h2>Manage Attendees</h2>
      <CheckInForm eventId={eventId} buttonText='Add Attendee' />
      <div id="list-container">
        <h2>Attendee List</h2>
        <AttendeeList attendees={attendees} eventId={eventId} canRemove={true} />
      </div>
    </>
  );
}

export default AttendeeManager;