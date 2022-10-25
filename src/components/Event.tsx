import React, { useEffect, useState } from 'react'
import events from '../data/events.json'
import { useSettingsContext } from '../utils/settingsContext'
import Countdown from './Countdown'
import { add, addSeconds, differenceInHours, formatDistanceToNow, getMinutes, getSeconds } from 'date-fns'
import { pushNotification } from './Utils'
import classNames from 'classnames'

const startDate = new Date('2022-10-17T10:00:00+00:00')

interface Event {
  id: number
  name: string
  location: string
  tags: string[]
  wikiUrl: string
  startTime?: Date
}

const getNextEvent = (special: boolean): Event => {
  const date = addSeconds(new Date(), 1) // guarantee hour rollover
  const idx = differenceInHours(date, startDate) % 13
  const event: Event = special
    ? events.find((e: Event) => e.id >= idx && e.tags.includes('Special')) || events[idx]
    : events[idx]

  event.startTime = add(date, {
    hours: event.id - idx,
    minutes: 59 - getMinutes(date),
    seconds: 60 - getSeconds(date),
  })
  return event
}

function Event() {
  const { settings } = useSettingsContext()
  const [nextEvent, setNextEvent] = useState<Event>(getNextEvent(settings.special))
  const [notified, setNotified] = useState<boolean>(false)

  useEffect(() => {
    setNextEvent(getNextEvent(settings.special))
  }, [settings])

  const handleNotification = () => {
    const title = 'Wilderness Event Tracker'
    const timeLeft = formatDistanceToNow(nextEvent.startTime || new Date())
    const message = `${nextEvent.name} event is starting in ${timeLeft}!`
    pushNotification(title, message)
    if (settings.notify) setNotified(true)
  }

  const updateEvent = () => {
    setNextEvent(getNextEvent(settings.special))
    if (settings.notify) setNotified(false)
  }

  const openMapLocation = () => {
    // TODO
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-3 py-2">
        <div className="mb-1">Time until next event:</div>
        <Countdown
          finalDate={nextEvent.startTime || new Date()}
          beforeFinish={settings.notify && !notified ? 300 * 1000 : undefined}
          onBeforeFinish={settings.notify && !notified ? handleNotification : undefined}
          onFinish={updateEvent}
          key={nextEvent.id}
        />
      </div>
      <div className="nisseperator relative" />
      <div className="px-3 py-2">
        <div className="flex flex-row mb-1 relative">
          <div className="flex-grow">Next event:</div>
          <div className="absolute top-0 right-0">
            <a
              className="w-8 h-8 block bg-[url('./assets/wikibutton.png')] bg-contain"
              href={nextEvent.wikiUrl}
              target="_blank"
              title="Open Wiki link to event"
            />
          </div>
        </div>
        <div className="text-base font-bold w-11/12">{nextEvent.name}</div>
        <div className="flex flex-row mt-1">
          {nextEvent.tags.map((tag: string, idx) => (
            <div
              key={tag}
              className={classNames(
                'text-xs inline-flex items-center font-bold px-3 py-1 rounded-full',
                idx > 0 ? 'ml-2' : '',
                tag === 'Special'
                  ? 'bg-amber-500 text-neutral-900 border-amber-700 hover:bg-amber-600 hover:text-neutral-100'
                  : 'bg-neutral-300 text-neutral-900 border-neutral-700 hover:bg-neutral-700 hover:text-neutral-100'
              )}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="nisseperator relative" />
      <div className="px-3 py-2">
        <div className="flex flex-row mb-1 relative">
          <div className="flex-grow">Location:</div>
          {/*          <div className="absolute top-0 right-0">
            <button
              className="w-6 h-6 bg-[url('./assets/worldmap.png')]"
              onClick={openMapLocation}
              title="Show location on map"
            />
          </div>*/}
        </div>
        <div className="text-base font-bold w-11/12">{nextEvent.location}</div>
      </div>
    </div>
  )
}

export default Event