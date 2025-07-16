import CheckInForm from "../components/CheckInForm";

function CheckIn () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event') ?? '-1';

    if(eventId == '-1') {
        return <main id="error-alert" className="active">Error! Invalid Event Id.</main>
    }
    return <main>
        <h1>Check In</h1>
        <CheckInForm eventId={eventId} showAdminCheck={true} buttonText='Check In' onSuccess={() => window.location.href = '/event/' + eventId}/>
    </main>
}

export default CheckIn;