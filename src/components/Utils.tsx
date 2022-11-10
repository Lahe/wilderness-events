// @ts-ignore
import icon from '/favicon.png'

// @ts-ignore
const alt1 = window.alt1

export const showTooltip = (tooltip = '') => {
  if (tooltip != '') {
    if (!alt1.setTooltip(tooltip)) {
      console.log('Error: No tooltip permission')
    }
  } else {
    alt1.clearTooltip()
  }
}

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

export const copyStyles = (sourceDoc: Document, targetDoc: Document) => {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if (styleSheet.cssRules) { // for <style> elements
      const newStyleEl = sourceDoc.createElement('style')

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText))
      })

      targetDoc.head.appendChild(newStyleEl)
    } else if (styleSheet.href) { // for <link> elements loading CSS from a URL
      const newLinkEl = sourceDoc.createElement('link')

      newLinkEl.rel = 'stylesheet'
      newLinkEl.href = styleSheet.href
      targetDoc.head.appendChild(newLinkEl)
    }
  })
}
