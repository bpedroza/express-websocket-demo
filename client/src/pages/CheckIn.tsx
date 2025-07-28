import CheckInForm from "../components/CheckInForm";
import { useUserDispatchContext } from "../context/UserContext";
import type { CheckInState } from "../actions/attendee/checkin-action";
import { useNavigate } from "react-router";
import { socket } from "../context/SocketContext";

function CheckIn () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event') ?? '-1';
    const nav = useNavigate();

    if(eventId == '-1') {
        return <main id="error-alert" className="active">Error! Invalid Event Id.</main>
    }

    const dispatch = useUserDispatchContext();

    const handleSuccess = function(state: CheckInState) {
        if(state.user === null) {
            console.log('invalid user returned from api.');
            return;
        }
        dispatch({
            type: 'LOGIN',
            payload: state.user
        });
        socket.connect();
        return nav('/event/' + eventId);
    }
    return <main>
        <h1>Check In</h1>
        <CheckInForm eventId={eventId} showAdminCheck={true} buttonText='Check In' onSuccess={handleSuccess}/>
    </main>
}

export default CheckIn;