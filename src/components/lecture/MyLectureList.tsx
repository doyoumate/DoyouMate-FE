import { FlatList, StatusBar, StyleSheet, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NavigatorParamList } from '../../navigators/navigation'
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import TouchableScale from '../../components/common/TouchableScale.tsx'
import { Ionicons } from '../../lib/icon/icons.ts'
import Text from '../../components/common/Text.tsx'
import TimeTable, { SkeletonTimeTable } from '../../components/lecture/TimeTable.tsx'
import { getEventGroups } from '../../lib/util/datetime.ts'
import LectureItem, { SkeletonLectureItem } from '../../components/lecture/LectureItem.tsx'
import { LectureResponse } from '../../module/lecture/types/response'
import { AnimatedView } from '../common/Animated.tsx'
import { FadeIn } from 'react-native-reanimated'
import { createSkeletonArray } from '../../lib/util/skeleton.ts'

interface Props {
  lectures: LectureResponse[]
  isLoading?: boolean
}

type DisplayType = (typeof displayType)[keyof typeof displayType]

const displayType = {
  timeTable: '시간표',
  list: '리스트'
} as const

const MyLectureList = ({ lectures, isLoading }: Props) => {
  const navigation = useNavigation<NavigationProp<NavigatorParamList, 'appliedLecture'>>()
  const [type, setType] = useState<DisplayType>(displayType.timeTable)
  const groups = useMemo(() => getEventGroups([...lectures]), [lectures])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(250, 250, 250)" />
      <View style={styles.types}>
        <TypeButton type={displayType.timeTable} setType={setType} currentType={type} />
        <TypeButton type={displayType.list} setType={setType} currentType={type} />
      </View>
      <View style={{ flex: 1 }}>
        {type === displayType.timeTable ? (
          isLoading ? (
            <SkeletonTimeTable />
          ) : (
            <TimeTable groups={groups} lectures={lectures} />
          )
        ) : (
          <FlatList
            data={lectures}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) => (
              <TouchableScale
                activeScale={0.99}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('lectureInfo', { lecture: item })}>
                <LectureItem lecture={item} containerStyle={{ backgroundColor: 'rgb(240, 240, 240)' }} />
              </TouchableScale>
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              isLoading ? (
                <FlatList
                  style={{ gap: 10 }}
                  data={createSkeletonArray(8)}
                  renderItem={() => <SkeletonLectureItem />}
                  keyExtractor={item => item.toString()}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <></>
              )
            }
            ListEmptyComponent={
              isLoading ? (
                <></>
              ) : (
                <AnimatedView
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 500
                  }}
                  entering={FadeIn.duration(500)}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 14
                    }}>
                    강의가 없습니다.
                  </Text>
                </AnimatedView>
              )
            }
          />
        )}
      </View>
    </View>
  )
}

const TypeButton = ({
  type,
  setType,
  currentType
}: {
  type: DisplayType
  setType: Dispatch<SetStateAction<DisplayType>>
  currentType: DisplayType
}) => {
  return (
    <TouchableScale
      style={[{ borderRadius: 20 }, type === currentType && styles.activatedType]}
      containerStyle={styles.type}
      activeScale={0.98}
      activeOpacity={0.8}
      onPress={() => setType(type)}>
      <Ionicons name="list" size={12} color={type === currentType ? 'white' : 'black'} />
      <Text
        style={{
          fontSize: 12,
          marginRight: 1.5,
          fontWeight: 'normal',
          ...(type === currentType && {
            color: 'white',
            fontWeight: 'bold'
          })
        }}>
        {type}
      </Text>
    </TouchableScale>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 20
  },
  types: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 6,
    marginBottom: 12
  },
  type: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 0.2,
    borderColor: 'rgb(200, 200, 200)',
    borderRadius: 20
  },
  activatedType: {
    borderWidth: 0,
    backgroundColor: 'rgb(102,176,255)'
  }
})

export default MyLectureList
