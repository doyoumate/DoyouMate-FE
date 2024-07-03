import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { NavigatorParamList } from '../../navigators/navigation'
import { Ionicons } from '../../lib/icon/icons.ts'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TagItem from '../../components/lecture/TagItem.tsx'
import Line from '../../components/common/Line.tsx'
import Text from '../../components/common/Text.tsx'
import useMark from '../../module/lecture/hooks/useMark.ts'
import TouchableScale from '../../components/common/TouchableScale.tsx'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { AnimatedText, AnimatedView } from '../../components/common/Animated.tsx'
import LectureDetails from '../../components/lecture/Details.tsx'

interface Props {
  navigation: NavigationProp<NavigatorParamList, 'lectureInfo'>
  route: RouteProp<NavigatorParamList, 'lectureInfo'>
}

type DisplayType = (typeof displayType)[keyof typeof displayType]

const displayType = {
  detail: '상세 정보',
  review: '강의 평가'
} as const

const LectureInfoScreen = ({ navigation, route }: Props) => {
  const [type, setType] = useState<DisplayType>(displayType.detail)
  const { lecture } = route.params
  const { isMarked, markHandler } = useMark(lecture)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableScale onPress={markHandler} activeOpacity={0.8}>
          {isMarked ? <Ionicons name="bookmark" size={25} /> : <Ionicons name="bookmark-outline" size={25} />}
        </TouchableScale>
      )
    })
  }, [isMarked, markHandler, navigation])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(250, 250, 250)" />
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 12 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'normal',
              color: 'rgb(120, 120, 120)'
            }}>
            {lecture.year} {'>'} {lecture.grade}학년 {lecture.semester}
          </Text>
        </View>
        <View style={styles.name}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'extra'
            }}>
            {lecture.name}
          </Text>
        </View>
        <View style={styles.tags}>
          <TagItem name={lecture.major} />
          <TagItem name={lecture.type} />
          {lecture.section && <TagItem name={lecture.section} />}
        </View>
        <Line
          style={{
            height: 10,
            marginTop: 20,
            marginBottom: 12,
            backgroundColor: 'rgb(242, 242, 242)'
          }}
        />
        <View style={styles.buttons}>
          <TypeButton type={displayType.detail} setType={setType} currentType={type} />
          <TypeButton type={displayType.review} setType={setType} currentType={type} />
        </View>
        {type === displayType.detail ? <LectureDetails lecture={lecture} /> : <></>}
      </View>
    </ScrollView>
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
  const selectedButtonStyle = useAnimatedStyle(
    () => ({
      borderBottomColor: withTiming(type === currentType ? 'rgb(135, 200, 215)' : 'white', { duration: 300 })
    }),
    [currentType]
  )
  const selectedTextStyle = useAnimatedStyle(
    () => ({
      color: withTiming(type === currentType ? 'rgb(70, 150, 160)' : 'rgb(0, 0, 0)', { duration: 300 })
    }),
    [currentType]
  )

  return (
    <TouchableScale
      activeScale={0.98}
      style={{
        flex: 1,
        alignItems: 'center'
      }}
      onPress={() => setType(type)}>
      <AnimatedView style={[styles.button, selectedButtonStyle]}>
        <AnimatedText
          style={[
            {
              fontSize: 13,
              ...(type === currentType && { fontWeight: 'bold' })
            },
            selectedTextStyle
          ]}>
          {type}
        </AnimatedText>
      </AnimatedView>
    </TouchableScale>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 25
  },
  name: {
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 12
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    paddingHorizontal: 12
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
    marginBottom: 15,
    borderBottomWidth: 0.3,
    borderColor: 'rgb(200, 200, 200)'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderBottomWidth: 3
  }
})

export default LectureInfoScreen
