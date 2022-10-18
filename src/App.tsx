import React, { useState } from 'react'
import Settings from './components/Settings'
import Event from './components/Event'
import { SettingsProvider } from './utils/settingsContext'

function App() {
  const [showSettings, setShowSettings] = useState<boolean>(false)

  return (
    <SettingsProvider>
      <div className="relative nisborder border-2 w-72 h-72">
        <div className="absolute p-3 right-0">
          <div
            className="nissmallimagebutton menubutton bg-[url('./assets/settingsbutton.png')]"
            onClick={() => setShowSettings(!showSettings)}
            title="Show settings"
          />
        </div>
        <Event />
        <Settings show={showSettings} onShowChange={() => setShowSettings(!showSettings)} />
      </div>
    </SettingsProvider>
  )
}

export default App