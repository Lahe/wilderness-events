import { useState } from 'react'
import { useInterval } from '../utils/useInterval'
import dayjs, { Dayjs } from 'dayjs'

interface Props {
  finalDate: Dayjs
  onFinish: () => void
  className: string
  title: string
  beforeFinish?: number
  onBeforeFinish?: () => void
  timeFormat?: string
  interval?: number
}

const formatTime = (time: number) => {
  const duration = dayjs.duration(time)
  const format = duration.hours() >= 1 ? 'HH:mm:ss' : 'mm:ss'
  return duration.format(format)
}

const roundMs = (n: number) => Math.round(n / 1000) * 1000

function Countdown({ finalDate, onFinish, className, title, beforeFinish, onBeforeFinish, interval = 1000 }: Props) {
  const [time, setTime] = useState<number>(roundMs(finalDate.diff(dayjs.utc(), 'milliseconds')))

  useInterval(
    () => {
      const remaining = roundMs(finalDate.diff(dayjs.utc(), 'milliseconds'))
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