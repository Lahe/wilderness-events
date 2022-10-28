import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useMediaQuery } from '../utils/useMediaQuery'

interface Props {
  isOpen: boolean
  onClose: () => void
}

function Modal({ isOpen, onClose }: Props) {
  const [isHidden, setIsHidden] = useState<boolean>(true)
  const compact = useMediaQuery('(max-width: 15rem) and (max-height: 7rem)')

  useEffect(() => {
    if (isOpen) {
      setIsHidden(false)
    }
  }, [isOpen])

  const handleCloseModal = () => {
    onClose()
    setTimeout(() => {
      setIsHidden(true)
    }, 500)
  }

  return (
    <div
      className={classNames(
        isOpen ? 'fadeIn' : 'fadeOut',
        isHidden ? 'hidden' : 'flex',
        'fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center animated faster'
      )}
      style={{ background: 'rgba(0,0,0,.7)' }}
    >
      <div
        className={classNames(
          compact ? 'text-[10px]' : 'text-[13px]',
          'border border-teal-500 shadow-lg modal-container bg-neutral-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto'
        )}
      >
        <div className={classNames(compact ? 'p-0' : 'py-1 px-2', 'text-center')}>
          <div className={classNames(compact ? 'my-1' : 'my-2')}>
            <p>Manually resize this window.</p>
          </div>
          <div className={classNames(compact ? 'py-1' : 'py-2', 'flex justify-center')}>
            <button
              onClick={handleCloseModal}
              className={classNames(
                compact ? 'px-2 py-1' : 'px-3 py-1',
                'focus:outline-none border-neutral-400 border bg-neutral-700 text-neutral-100 rounded hover:bg-neutral-100 hover:text-neutral-900 hover:border-black'
              )}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
