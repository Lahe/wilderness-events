import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initializeNotifications } from './components/Utils'
import './index.css'
import { SettingsProvider } from './utils/settingsContext'

declare global {
  interface Window {
    alt1: any
  }
}

if (window.alt1) {
  const alt1 = window.alt1
  alt1.identifyAppUrl('/appconfig.json')
} else {
  initializeNotifications()
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <SettingsProvider>
    <App />
  </SettingsProvider>
)
