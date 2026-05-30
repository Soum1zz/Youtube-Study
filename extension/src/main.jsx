import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
console.log("MAIN JSX LOADED")


export function mountStudyBuddy(){
  const rootElement =
  document.getElementById('study-buddy-root')

    if (!rootElement) return;

    createRoot(rootElement).render(
      <App />
  );

}
