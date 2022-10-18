import { useState } from 'react'
import { useInterval } from '../utils/useInterval'
import { differenceInSeconds } from 'date-fns'
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
  const format = time >= 3600 ? 'HH:mm:ss' : 'mm:ss'
  return formatInTimeZone(time * 1000, 'UTC', format)
}

function Countdown({ finalDate, onFinish, beforeFinish, onBeforeFinish, interval = 1000 }: Props) {
  const [time, setTime] = useState<number>(differenceInSeconds(finalDate, new Date()))

  useInterval(
    () => {
      const remaining = differenceInSeconds(finalDate, new Date())
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