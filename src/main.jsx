import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import PlayerContextProvider from './context/PlayerContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <PlayerContextProvider>
        <App />
      </PlayerContextProvider>
    </HashRouter>
  </StrictMode>,
)
