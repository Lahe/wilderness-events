import { EffectCallback, useEffect, useRef } from 'react'

export const useInterval = (callback: EffectCallback, interval: number | null) => {
  const intervalRef = useRef<number | null>(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (interval !== null) {
      intervalRef.current = window.setInterval(() => {
        callbackRef.current()
      }, interval)

      return () => window.clearInterval(intervalRef.current || 0)
    }
  }, [interval])

  useEffect(() => {
    return () => window.clearInterval(intervalRef.current || 0)
  }, [])

  return intervalRef
}