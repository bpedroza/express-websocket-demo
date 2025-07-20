import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";

function LoggedInHeader({ eventId }: { eventId: string }) {
  const { isConnected, eventIsValid } = useContext(SocketContext);
  const nav = useNavigate();
  const user = useContext(UserContext);

  useEffect(() => {
    if (!eventIsValid) {
      if(user.eventId > 0) {
        nav('/?event=' + user.eventId);
      } else {
        nav('/');
      }
    }
  }, [eventIsValid])

  return (
    <header>
      <div id="nav-left">
        <span id="nav-title">WebPolls</span>
        <div title={isConnected ? 'Online' : 'Offline'} className={isConnected ? 'online' : ''} id="status-bubble">&nbsp;</div>
      </div>
      <div id="nav-links">
        <NavLink to={`/event/${eventId}`}>Event Home</NavLink>
        {user.isAdmin && <NavLink to={`/event/${eventId}/admin`}>Admin</NavLink>}
      </div>
    </header>
  );
};

export default LoggedInHeader;