import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import CheckIn from './pages/CheckIn'
import EventAdmin from './pages/EventAdmin'
import LoggedOut from './layouts/LoggedOut'
import LoggedIn from './layouts/LoggedIn'
import Event from './pages/Event'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoggedOut />}>
          <Route path='/' element={<CheckIn />} />
        </Route>

        <Route element={<LoggedIn />}>
          <Route path='/event/:eventId' element={<Event />} />
          <Route path='/event/:eventId/admin' element={<EventAdmin />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
