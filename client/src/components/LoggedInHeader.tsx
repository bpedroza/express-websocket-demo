import { useContext } from "react";
import { NavLink } from "react-router";
import { SocketContext } from "../context/SocketContext";

function LoggedInHeader({ eventId }: { eventId: string }) {
  const { isConnected } = useContext(SocketContext);
  return (
    <header>
      <div id="nav-left">
        <span id="nav-title">WebPolls</span>
        <div title={isConnected ? 'Online' : 'Offline'} className={isConnected ? 'online' : ''} id="status-bubble">&nbsp;</div>
      </div>
      <div id="nav-links">
        <NavLink to={`/event/${eventId}`}>Event Home</NavLink>
        <NavLink to={`/event/${eventId}/admin`}>Admin</NavLink>
      </div>
    </header>
  );
};

export default LoggedInHeader;