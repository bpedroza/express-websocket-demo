import { useState } from 'react';
import PollsManager from '../components/PollsManager.tsx';
import AttendeeManager from '../components/AttendeeManager.tsx';

function EventAdmin() {
  
  const [activeTab, setActiveTab] = useState<string>('attendee');

  return (
    <>
      <h1>Websocket Attendee Demo</h1>
      <div id="main">
        <div className='nav-tabs-container'>
          <div className="nav-tabs">
            <button onClick={() => setActiveTab('attendee')} className={`nav-item ${activeTab == 'attendee' ? 'active' : ''}`}>Attendees</button>
            <button onClick={() => setActiveTab('polls')} className={`nav-item ${activeTab == 'polls' ? 'active' : ''}`}>Polls</button>
          </div>
        </div>
        
        {activeTab == 'attendee' && <AttendeeManager />}
        { activeTab == 'polls' && <PollsManager />}

      </div>
    </>
  )
}

export default EventAdmin
