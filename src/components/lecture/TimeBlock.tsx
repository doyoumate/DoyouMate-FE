import moment, { Moment } from 'moment/moment'
import React from 'react'
import Text from '../common/Text.tsx'
import { EventGroup } from '../../lib/util/datetime.ts'
import { TouchableOpacity, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NavigatorParamList } from '../../navigators/navigation'

interface Props {
  group: EventGroup
  minTime: Moment
}

const TimeBlock = ({ group, minTime }: Props) => {
  const navigation = useNavigation<NavigationProp<NavigatorParamList>>()
  const startTime = moment(group.startTime, 'HH:mm').format('H:mm')
  const endTime = moment(group.endTime, 'HH:mm').format('H:mm')
  const top =
    (moment(group.startTime, 'HH:mm').hours() - minTime.hours()) * 60 + moment(group.startTime, 'HH:mm').minutes()
  const height = moment(group.endTime, 'HH:mm').diff(moment(group.startTime, 'HH:mm'), 'minutes')

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('lectureInfo', { lecture: group.events[0].lecture })}>
      <View
        style={{
          gap: 2,
          position: 'absolute',
          top,
          left: 0,
          right: 0,
          minHeight: 60,
          height,
          padding: 2,
          backgroundColor: group.color
        }}>
        {group.events.map((event, index) => (
          <Text
            key={index}
            style={{
              fontSize: 12,
              color: 'white',
              fontWeight: 'bold'
            }}>
            {event.lecture.name}
          </Text>
        ))}
        {group.events.length === 1 && (
          <Text
            style={{
              fontSize: 10,
              color: 'white'
            }}>
            {group.events[0].lecture.room}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default TimeBlock
