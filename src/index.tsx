import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initializeNotifications } from './components/Utils'
import './index.css'
import 'font-awesome/css/font-awesome.min.css'

//@ts-ignore
if (window.alt1) {
  //@ts-ignore
  const alt1 = window.alt1
  alt1.identifyAppUrl('/appconfig.json')
} else {
  initializeNotifications()
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
