import { useContext } from "react";
import AttendeeList from "../components/AttendeeList";
import { SocketContext } from "../context/SocketContext";

function Event () {
    const { attendees } = useContext(SocketContext);
    return <>
        <h2>Polls</h2>
        <div id="list-container">
          <h2>Attendee List</h2>
          <AttendeeList attendees={attendees} canRemove={false} />
        </div>
    </>
}

export default Event;