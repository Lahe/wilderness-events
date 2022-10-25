import { useState } from 'react'
import { useInterval } from '../utils/useInterval'
import { differenceInMilliseconds, millisecondsToHours } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

interface Props {
  finalDate: Date
  onFinish: () => void
  beforeFinish?: number
  onBeforeFinish?: () => void
  timeFormat?: string
  interval?: number
}

const formatTime = (time: number) => {
  const format = millisecondsToHours(time) >= 1 ? 'HH:mm:ss' : 'mm:ss'
  return formatInTimeZone(time, 'UTC', format)
}

function Countdown({ finalDate, onFinish, beforeFinish, onBeforeFinish, interval = 1000 }: Props) {
  const [time, setTime] = useState<number>(differenceInMilliseconds(finalDate, new Date()))

  useInterval(
    () => {
      const remaining = differenceInMilliseconds(finalDate, new Date())
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

  return <div className="text-3xl font-bold">{formatTime(time)}</div>
}

export default Countdown