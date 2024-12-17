import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MobileNavbarProvider } from './contexts/MobileNavbar.jsx'

createRoot(document.getElementById('root')).render(
  <MobileNavbarProvider>
    <App />
  </MobileNavbarProvider>
)
