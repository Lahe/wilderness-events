import React, { useEffect, useState } from 'react'
import { useSettingsContext } from '../utils/settingsContext'

interface Props {
  onResizableClicked: () => void
}

function Settings({ onResizableClicked }: Props) {
  const { settings, setSettings } = useSettingsContext()
  const [notify, setNotify] = useState<boolean>(settings.notify || false)
  const [tooltip, setTooltip] = useState<boolean>(settings.tooltip || false)
  const [special, setSpecial] = useState<boolean>(settings.special || false)
  const [resizable, setResizable] = useState<boolean>(settings.resizable || false)

  useEffect(() => {
    setSettings({ notify, tooltip, special, resizable })
  }, [notify, tooltip, special, resizable])

  return (
    <div className="w-full h-screen p-2 bottom-0 nisborder border-2">
      <div className="flex items-center">
        <p className="flex-grow font-bold text-lg">Settings</p>
      </div>
      <div className="flex flex-col">
        <label className="p-2 flex flex-row items-center">
          <input className="mr-2" type="checkbox" name="notify" checked={notify} onChange={() => setNotify(!notify)} />
          <p>Notify 5 minutes before start</p>
        </label>
        <label className="p-2 flex flex-row items-center">
          <input
            className="mr-2"
            type="checkbox"
            name="tooltip"
            checked={tooltip}
            onChange={() => setTooltip(!tooltip)}
          />
          <p>Show cursor tooltip on notification</p>
        </label>
        <label className="p-2 flex flex-row items-center">
          <input
            className="mr-2"
            type="checkbox"
            name="special"
            checked={special}
            onChange={() => setSpecial(!special)}
          />
          <p>Show only special events</p>
        </label>
        <label className="p-2 flex flex-row items-center">
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
          <p>Make resizable</p>
        </label>
      </div>
    </div>
  )
}

export default Settings