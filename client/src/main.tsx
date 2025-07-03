import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const urlParams = new URLSearchParams(window.location.search);
const eventId = parseInt(urlParams.get('event') ?? '1');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App eventId={eventId} />
  </StrictMode>,
)
