import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Standings from './components/Standings.jsx'
import { BrowserRouter, Route, Routes } from 'react-router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/leagues/:leagueName' element={<Standings />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
