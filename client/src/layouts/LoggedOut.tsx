import { Outlet } from "react-router";

function LoggedOut() {
  return (
    <>
      <header>
        <div id="nav-left">
          <span id="nav-title">WebPolls</span>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default LoggedOut;