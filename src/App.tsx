import React, { useEffect, useState } from 'react'
import Event from './components/Event'
import Settings from './components/Settings'
import { useMediaQuery } from './utils/useMediaQuery'
import { useSettingsContext } from './utils/settingsContext'
import Modal from './components/Modal'
import WindowPortal from './components/WindowPortal'

function App() {
  const { settings } = useSettingsContext()
  const [settingsOpened, setSettingsOpened] = useState<boolean>(false)
  const [modalOpened, setModalOpened] = useState<boolean>(false)
  const bigSettingsIcon = useMediaQuery('(min-width: 15rem) and (min-height: 11rem)')

  useEffect(() => {
    if (window.alt1) {
      const alt1 = window.alt1
      if (settings.resizable) {
        alt1.identifyAppUrl('appconfig.compact.json')
      } else {
        alt1.identifyAppUrl('appconfig.json')
      }
    }
  }, [settings.resizable])

  const handleResizableClicked = () => {
    if (window.alt1) {
      setModalOpened(true)
    }
  }

  return (
    <>
      <div className="relative nisborder border-2">
        {bigSettingsIcon ? (
          <div className="absolute p-3 right-0">
            <div
              className="nissmallimagebutton menubutton bg-[url('./assets/settingsbutton.png')]"
              onClick={() => setSettingsOpened(true)}
              title="Show settings"
            />
          </div>
        ) : (
          <div className="absolute p-1 right-0 top-3">
            <div
              className="compactbutton bg-[url('./assets/settingscog.png')]"
              onClick={() => setSettingsOpened(true)}
              title="Settings"
            />
          </div>
        )}
        <Event />
      </div>
      {settingsOpened && (
        <WindowPortal onClose={() => setSettingsOpened(false)}>
          <Settings onResizableClicked={handleResizableClicked} />
        </WindowPortal>
      )}
      <Modal isOpen={modalOpened} onClose={() => setModalOpened(false)} />
    </>
  )
}

export default App