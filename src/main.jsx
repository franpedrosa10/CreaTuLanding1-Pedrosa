import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { CarritoProvider } from "./context/CarritoContext";
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
    <StrictMode>
    <CarritoProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </CarritoProvider>
  </StrictMode>
)
