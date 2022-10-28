import { useState } from 'react'
import { useInterval } from '../utils/useInterval'
import { differenceInMilliseconds, millisecondsToHours } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

interface Props {
  finalDate: Date
  onFinish: () => void
  className: string
  title: string
  beforeFinish?: number
  onBeforeFinish?: () => void
  timeFormat?: string
  interval?: number
}

const formatTime = (time: number) => {
  const format = millisecondsToHours(time) >= 1 ? 'HH:mm:ss' : 'mm:ss'
  return formatInTimeZone(time, 'UTC', format)
}

const roundMs = (n: number) => Math.round(n / 1000) * 1000

function Countdown({ finalDate, onFinish, className, title, beforeFinish, onBeforeFinish, interval = 1000 }: Props) {
  const [time, setTime] = useState<number>(roundMs(differenceInMilliseconds(finalDate, new Date())))

  useInterval(
    () => {
      const remaining = roundMs(differenceInMilliseconds(finalDate, new Date()))
      if (beforeFinish && onBeforeFinish && remaining <= beforeFinish) {
        onBeforeFinish()
      }
      if (remaining <= 0) {
        onFinish()
      }
      setTime(remaining)
    },
    time > 0 ? interval : null
  )

  return (
    <div className={className} title={title}>
      {formatTime(time)}
    </div>
  )
}

export default Countdown