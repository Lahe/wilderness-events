import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface Settings {
  notify: boolean
  special: boolean
  resizable: boolean
}

const useSettings = () => {
  const defaultSettings: Settings = { notify: true, special: false, resizable: true }
  const [storedSettings, setStoredSettings] = useState<Settings>(() => {
    try {
      const value = localStorage.getItem('settings')
      if (value) {
        return JSON.parse(value)
      } else {
        localStorage.setItem('settings', JSON.stringify(defaultSettings))
        return defaultSettings
      }
    } catch (err) {
      return defaultSettings
    }
  })

  const setSettings = (newSettings: Settings) => {
    try {
      localStorage.setItem('settings', JSON.stringify(newSettings))
    } catch (err) {}
    setStoredSettings(newSettings)
  }

  return {
    settings: storedSettings,
    setSettings,
  }
}

const SettingsContext = createContext({} as ReturnType<typeof useSettings>)

export const useSettingsContext = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('No settings context found.')
  }
  return context
}

export const SettingsProvider = (props: PropsWithChildren) => {
  return <SettingsContext.Provider value={useSettings()}>{props.children}</SettingsContext.Provider>
}

