import { useContext } from "react";
import AttendeeList from "../components/AttendeeList";
import { SocketContext } from "../context/SocketContext";
import PollList from "../components/PollList";

function Event() {
  const { attendees, polls } = useContext(SocketContext);
  return <>
    <div className="list-container">
      <h2>Polls</h2>
      <PollList polls={polls} />
    </div>

    <div className="list-container">
      <h2>Attendee List</h2>
      <AttendeeList attendees={attendees} canRemove={false} />
    </div>
  </>
}

export default Event;