import React, { useEffect, useState } from 'react'
import events from '../data/events.json'
import { useSettingsContext } from '../utils/settingsContext'
import Countdown from './Countdown'
import { pushNotification } from './Utils'
import classNames from 'classnames'
import { useMediaQuery } from '../utils/useMediaQuery'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(utc)
dayjs.extend(duration)
dayjs.extend(relativeTime)

const startDate = dayjs.utc('2022-10-17T10:00:00+00:00')

interface Event {
  id: number
  name: string
  location: string
  tags: string[]
  wikiUrl: string
  startTime?: Dayjs
}

const getNextEvent = (special: boolean): Event => {
  const date = dayjs.utc().add(1, 'second') // guarantee hour rollover
  const idx = date.diff(startDate, 'hours') % 13
  const event: Event = special
    ? events.find((e: Event) => e.id >= idx && e.tags.includes('Special')) || events[idx]
    : events[idx]

  event.startTime = date.add(
    dayjs.duration({
      hours: event.id - idx,
      minutes: 59 - date.minute(),
      seconds: 60 - date.second(),
    })
  )
  return event
}

function Event() {
  const { settings } = useSettingsContext()
  const [nextEvent, setNextEvent] = useState<Event>(getNextEvent(settings.special))
  const [notified, setNotified] = useState<boolean>(false)
  const showName = useMediaQuery('(min-width: 15rem) and (min-height: 11rem)')
  const showLocation = useMediaQuery('(min-width: 15rem) and (min-height: 18rem)')

  useEffect(() => {
    setNextEvent(getNextEvent(settings.special))
  }, [settings.special])

  const handleNotification = () => {
    const title = 'Wilderness Event Tracker'
    const timeLeft = (dayjs.utc(nextEvent.startTime) || dayjs.utc()).fromNow()
    const message = `${nextEvent.name} event is starting ${timeLeft}!`
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
    <div className="flex flex-col">
      {!showName && !showLocation && (
        <div className="absolute p-1 right-0 top-8">
          <a
            className="compactbutton block bg-[url('./assets/infoicon.png')]"
            href={nextEvent.wikiUrl}
            target="_blank"
            title={`Next event: ${nextEvent.name}`}
          />
        </div>
      )}
      <div className="min-h-[5rem] px-3 py-2">
        <div className="mb-1">Next event in:</div>
        <Countdown
          className={classNames(
            !showName && !showLocation && settings.special ? 'text-amber-500' : 'text-inherit',
            'text-3xl font-bold'
          )}
          finalDate={nextEvent.startTime || dayjs.utc()}
          beforeFinish={settings.notify && !notified ? 300 * 1000 : undefined}
          onBeforeFinish={settings.notify && !notified ? handleNotification : undefined}
          onFinish={updateEvent}
          title={`Next event: ${nextEvent.name}`}
          key={nextEvent.id}
        />
      </div>
      {showName && (
        <>
          <div className="nisseperator relative" />
          <div className="min-h-[6rem] px-3 py-2">
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
        </>
      )}
      {showLocation && (
        <>
          <div className="nisseperator relative" />
          <div className="min-h-[7rem] px-3 py-2">
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
        </>
      )}
    </div>
  )
}

export default Event