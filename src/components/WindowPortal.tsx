import { ReactNode, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { copyStyles } from './Utils'

interface Props {
  children: ReactNode
  onClose: () => void
}

const WindowPortal = ({ children, onClose }: Props) => {
  const externalWindow = useMemo<Window | null>(() => window.open('', '', 'width=275,height=200,left=300,top=200'), [])
  const windowPortalElement = document.createElement('div')

  if (externalWindow) {
    externalWindow.document.body.appendChild(windowPortalElement)
    copyStyles(document, externalWindow.document)
    externalWindow.document.body.classList.add('nis')

    externalWindow.onbeforeunload = () => {
      onClose()
    }
  } else {
    return null
  }

  //useEffect(() => () => externalWindow.close())
  return createPortal(children, externalWindow.document.body)
}

export default WindowPortal