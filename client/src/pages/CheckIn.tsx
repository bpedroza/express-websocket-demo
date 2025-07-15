function CheckIn () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event') ?? '-1';

    if(eventId == '-1') {
        return <main id="error-alert" className="active">Error! Invalid Event Id.</main>
    }
    return <main>
        Check-In Page!
    </main>
}

export default CheckIn;