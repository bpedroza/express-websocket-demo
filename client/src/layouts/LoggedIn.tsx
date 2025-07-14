import { NavLink, Outlet, useParams } from "react-router";
import { useWebhookStatus } from "../hooks/useWebsocketStatus";

function LoggedIn() {
  const { eventId } = useParams();
  const isOnline = useWebhookStatus();
  return (
    <>
      <header>
        WebPolls
        <NavLink to={`/event/${eventId}`}>Event Home</NavLink>
        <NavLink to={`/event/${eventId}/admin`}>Event Admin</NavLink>
        <div title={isOnline ? 'Online' : 'Offline'} className={isOnline ? 'online' : ''} id="status-bubble">&nbsp;</div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default LoggedIn;