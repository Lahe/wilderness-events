import { useState } from 'react'
import { useInterval } from '../utils/useInterval'
import dayjs, { Dayjs } from 'dayjs'

interface Props {
  finalDate: Dayjs
  onFinish: () => void
  className: string
  title: string
  actions: Action[]
  timeFormat?: string
  interval?: number
}

interface Action {
  condition: (number: number) => boolean
  callback: () => void
}

const formatTime = (time: number) => {
  const duration = dayjs.duration(time)
  const format = duration.hours() >= 1 ? 'HH:mm:ss' : 'mm:ss'
  return duration.format(format)
}

const roundMs = (n: number) => Math.round(n / 1000) * 1000

function Countdown({ finalDate, onFinish, className, title, actions, interval = 1000 }: Props) {
  const [time, setTime] = useState<number>(roundMs(finalDate.diff(dayjs.utc(), 'milliseconds')))

  useInterval(
    () => {
      const remaining = roundMs(finalDate.diff(dayjs.utc(), 'milliseconds'))

      actions.forEach(action => {
        if (action.condition(remaining)) {
          action.callback()
        }
      })

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
