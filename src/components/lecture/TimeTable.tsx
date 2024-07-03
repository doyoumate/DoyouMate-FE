import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import moment from 'moment'
import TimeBlock from './TimeBlock.tsx'
import Text from '../common/Text.tsx'
import { days, EventGroup, getTimeRange } from '../../lib/util/datetime.ts'
import { LectureResponse } from '../../module/lecture/types/response'
import TouchableScale from '../common/TouchableScale.tsx'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NavigatorParamList } from '../../navigators/navigation'
import ContentLoader, { Rect } from 'react-content-loader/native'

interface Props {
  groups: EventGroup[]
  lectures: LectureResponse[]
}

const TimeTable = ({ groups, lectures }: Props) => {
  const navigation = useNavigation<NavigationProp<NavigatorParamList>>()
  const showWeekendColumn = groups.some(group => group.day === 6 || group.day === 7)
  const [minTime, maxTime] = getTimeRange(groups)
  const hours = new Array(Math.ceil(maxTime.hour()) - minTime.hour())
    .fill(minTime.hour())
    .map((hour, index) => hour + index)

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.hours} />
          {Object.keys(days).map(
            (day, index) =>
              (index < 5 || (index > 5 && showWeekendColumn)) && (
                <View style={styles.days} key={index}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold'
                    }}>
                    {day}
                  </Text>
                </View>
              )
          )}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.hours}>
            {hours.map(hour => (
              <View style={styles.hour} key={hour}>
                <Text style={{ fontSize: 10 }}>{hour}</Text>
              </View>
            ))}
          </View>
          <View style={styles.lines}>
            {[1, ...hours].map(hour => (
              <View style={styles.line} key={hour} />
            ))}
          </View>
          {Object.keys(days).map(
            (day, index) =>
              (index < 5 || (index > 5 && showWeekendColumn)) && (
                <View key={index} style={styles.column}>
                  {groups
                    .filter(event => event.day === index + 1)
                    .sort((event1, event2) => moment(event1.startTime, 'HH:mm').diff(moment(event2.startTime, 'HH:mm')))
                    .map(group => (
                      <TimeBlock group={group} minTime={minTime} key={group.events[0].lecture.id} />
                    ))}
                </View>
              )
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 6,
            marginVertical: 10
          }}>
          {lectures
            .filter(lecture => lecture.date === '')
            .map(lecture => (
              <TouchableScale
                activeScale={0.99}
                containerStyle={{
                  padding: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgb(240, 240, 240)'
                }}
                onPress={() => navigation.navigate('lectureInfo', { lecture })}
                key={lecture.id}>
                <Text
                  style={{
                    fontSize: 11
                  }}>
                  {lecture.name}
                </Text>
              </TouchableScale>
            ))}
        </View>
      </ScrollView>
    </View>
  )
}

const SkeletonTimeTable = () => {
  return (
    <ContentLoader speed={0.5} width="100%" height={500} backgroundColor="#ebebeb" foregroundColor="#e1e1e1">
      <Rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
    </ContentLoader>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 2
  },
  header: {
    flexDirection: 'row',
    height: 30
  },
  days: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 0.5,
    borderColor: 'rgb(210, 210, 210)'
  },
  hours: {
    width: 20,
    borderRightWidth: 1,
    borderColor: 'rgb(210, 210, 210)'
  },
  hour: {
    alignItems: 'center',
    height: 60,
    paddingTop: 6,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgb(210, 210, 210)'
  },
  lines: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 0
  },
  line: {
    height: 60,
    borderTopWidth: 0.5,
    borderColor: 'rgb(210, 210, 210)'
  },
  column: {
    flex: 1,
    borderLeftWidth: 0.5,
    borderColor: 'rgb(210, 210, 210)'
  }
})

export { SkeletonTimeTable }
export default TimeTable
