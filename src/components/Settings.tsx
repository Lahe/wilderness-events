import React, { useEffect, useState } from 'react'
import { useSettingsContext } from '../utils/settingsContext'

interface Props {
  onResizableClicked: () => void
}

function Settings({ onResizableClicked }: Props) {
  const { settings, setSettings } = useSettingsContext()
  const [notify, setNotify] = useState<boolean>(settings.notify || false)
  const [special, setSpecial] = useState<boolean>(settings.special || false)
  const [resizable, setResizable] = useState<boolean>(settings.resizable || false)

  useEffect(() => {
    setSettings({ notify, special, resizable })
  }, [notify, special, resizable])

  return (
    <div className="w-full h-screen p-2 bottom-0 nisborder border-2">
      <div className="flex items-center">
        <p className="flex-grow font-bold text-lg">Settings</p>
      </div>
      <div className="flex flex-col">
        <label className="p-2">
          <input className="mr-2" type="checkbox" name="notify" checked={notify} onChange={() => setNotify(!notify)} />
          Notify 5 minutes before start
        </label>
        <label className="p-2">
          <input
            className="mr-2"
            type="checkbox"
            name="special"
            checked={special}
            onChange={() => setSpecial(!special)}
          />
          Show only special events
        </label>
        <label className="p-2">
          <input
            className="mr-2"
            type="checkbox"
            name="compact"
            checked={resizable}
            onChange={() => {
              onResizableClicked()
              setResizable(!resizable)
            }}
          />
          Make resizable
        </label>
      </div>
    </div>
  )
}

export default Settings