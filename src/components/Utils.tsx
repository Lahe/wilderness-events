// @ts-ignore
import icon from '/favicon.png'

// @ts-ignore
const alt1 = window.alt1

// Ask for notification permissions when using regular browser
export const initializeNotifications = () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications.')
  } else {
    try {
      if (Notification.permission === 'default') {
        Notification.requestPermission()
      }
    } catch (e) {
      console.log('Failed to get notifications permissions.')
    }
  }
}

export const pushNotification = (title: string, message: string) => {
  if (alt1) {
    alt1.showNotification(title, message, '')
  } else {
    try {
      const permission = Notification.permission
      if (permission === 'granted') {
        const notification = new Notification('Wilderness Event Tracker', {
          body: message,
          icon
        })
      } else if (permission === 'denied') {
        console.log('Notifications disabled in browser.')
      }
    } catch (e) {
      console.log('Failed to send notification.')
    }
  }
}