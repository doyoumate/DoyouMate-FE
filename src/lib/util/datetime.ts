import { LectureResponse } from '../../module/lecture/types/response'
import moment, { Moment } from 'moment'
import { createSkeletonArray } from './skeleton.ts'

interface Event {
  lecture: LectureResponse
  startTime: string
  endTime: string
  day: number
  color: string
}

interface EventGroup {
  events: Event[]
  startTime: string
  endTime: string
  day: number
  color: string
}

const days: { [key: string]: number } = {
  월: 1,
  화: 2,
  수: 3,
  목: 4,
  금: 5,
  토: 6,
  일: 7
} as const

const toElapsedTime = (date: string): string => {
  const start = new Date(date)
  const end = new Date()
  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000)
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24

  if (seconds < 60) return '방금 전'
  else if (minutes < 60) return `${Math.floor(minutes)}분 전`
  else if (hours < 24) return `${Math.floor(hours)}시간 전`
  else if (days < 31) return `${Math.floor(days)}일 전`
  else return `${start.getFullYear()}년 ${start.getMonth() + 1}월 ${start.getDate()}일`
}

const getTimeRange = (groups: EventGroup[]): [Moment, Moment] => {
  const minTime = moment('09:00', 'HH:mm')
  let maxTime = moment('17:00', 'HH:mm')

  groups.forEach(group => {
    const eventsEndTime = moment(group.endTime, 'HH:mm')

    if (eventsEndTime.isAfter(maxTime)) maxTime = eventsEndTime
  })

  return [minTime, maxTime]
}

const getRandomColor = () =>
  `#${createSkeletonArray(3)
    .map(() => Math.floor(Math.random() * 100 + 128).toString(16))
    .join('')}`

const getEventGroups = (lectures: LectureResponse[]): EventGroup[] => {
  const events: Event[] = []

  lectures.forEach(lecture => {
    const dates = lecture.date.trim().split(',')
    const color = getRandomColor()

    dates.forEach(date => {
      const [day, time] = date.split('~')
      const startHour = Number(day.slice(1)) + 8
      const endHour = time ? Number(time) + 9 : startHour + 1

      events.push({
        lecture,
        startTime: `${startHour}:00`,
        endTime: `${endHour}:00`,
        day: days[day[0]],
        color
      })
    })
  })

  return mergeEvents(events)
}

const mergeEvents = (events: Event[]): EventGroup[] => {
  const groups: EventGroup[] = []

  events.sort((event1, event2) =>
    event1.day !== event2.day
      ? event1.day - event2.day
      : moment(event1.startTime, 'HH:mm').diff(moment(event2.startTime, 'HH:mm'))
  )

  events.forEach(event => {
    const overlappedGroup = groups.find(
      group =>
        group.day === event.day &&
        moment(group.endTime, 'HH:mm').isAfter(moment(event.startTime, 'HH:mm')) &&
        moment(group.startTime, 'HH:mm').isBefore(moment(event.endTime, 'HH:mm'))
    )

    if (overlappedGroup) {
      if (moment(event.startTime, 'HH:mm').isBefore(moment(overlappedGroup.endTime, 'HH:mm'))) {
        overlappedGroup.events.push(event)
        overlappedGroup.endTime = moment
          .max(moment(overlappedGroup.endTime, 'HH:mm'), moment(event.endTime, 'HH:mm'))
          .format('HH:mm')
        overlappedGroup.color = getRandomColor()
      }
    } else {
      groups.push({
        events: [event],
        startTime: event.startTime,
        endTime: event.endTime,
        day: event.day,
        color: event.color
      })
    }
  })

  return groups
}

export type { Event, EventGroup }
export { days, toElapsedTime, getTimeRange, getEventGroups }
