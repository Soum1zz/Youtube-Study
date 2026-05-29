import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement =
  document.getElementById('study-buddy-root')

if (rootElement) {
   ReactDOM.createRoot(rootElement).render(
      <App />
  )
}


