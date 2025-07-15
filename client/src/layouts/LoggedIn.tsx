import { Outlet, useParams } from "react-router";
import LoggedInHeader from "../components/LoggedInHeader";
import { SocketProvider } from "../context/SocketProvider";

function LoggedIn() {
  const { eventId = '' } = useParams();

  return (
    <>
      <SocketProvider>
        <LoggedInHeader eventId={eventId} />
        <main>
          <Outlet />
        </main>
      </SocketProvider>

    </>
  );
}

export default LoggedIn;