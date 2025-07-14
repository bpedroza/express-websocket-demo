import { Outlet } from "react-router";

function LoggedOut() {
  return (
    <>
      <header>
        WebPolls
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default LoggedOut;