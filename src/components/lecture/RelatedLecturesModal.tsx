import Modal, { ModalProps } from '../common/Modal.tsx'
import { useQuery } from 'react-query'
import { getRelatedLecturesById } from '../../module/lecture/api.ts'
import { FlatList } from 'react-native'
import LectureItem, { SkeletonLectureItem } from './LectureItem.tsx'
import Text from '../common/Text.tsx'
import TouchableScale from '../common/TouchableScale.tsx'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorParamList } from '../../navigators/navigation'
import React from 'react'
import { createSkeletonArray } from '../../lib/util/skeleton.ts'
import useStackEffect from '../../lib/hooks/useStackEffect.ts'
import { AnimatedView } from '../common/Animated.tsx'
import { FadeIn, FadeOut } from 'react-native-reanimated'

type Props = { id: string } & Omit<ModalProps, 'children'>

const RelatedLecturesModal = ({ isVisible, setIsVisible, id }: Props) => {
  const navigation = useNavigation<StackNavigationProp<NavigatorParamList>>()
  const { setIsNavigated } = useStackEffect(() => {
    setIsVisible(true)
  })
  const { data: lectures = [], isLoading } = useQuery(
    ['getRelatedLecturesById', id],
    () => getRelatedLecturesById(id),
    {
      enabled: isVisible,
      staleTime: 2.16e7,
      cacheTime: 2.16e7
    }
  )

  return (
    <Modal
      style={{ justifyContent: 'flex-end' }}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      containerStyle={{
        alignItems: 'center',
        height: '55%',
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white'
      }}
      useNativeDriver>
      <Text
        style={{
          marginVertical: 15,
          fontWeight: 'bold'
        }}>
        관련된 강의
      </Text>
      {isLoading ? (
        <FlatList
          style={{ width: '100%' }}
          contentContainerStyle={{ gap: 15 }}
          data={createSkeletonArray(4)}
          renderItem={() => <SkeletonLectureItem />}
          keyExtractor={item => item.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          style={{ width: '100%' }}
          contentContainerStyle={{ gap: 15 }}
          data={lectures}
          renderItem={({ item }) => (
            <TouchableScale
              activeScale={0.98}
              activeOpacity={0.8}
              onPress={() => {
                setIsVisible(false)
                navigation.push('lectureInfo', { lecture: item })
                setIsNavigated(true)
              }}>
              <AnimatedView entering={FadeIn.duration(500)}>
                <LectureItem lecture={item} containerStyle={{ backgroundColor: 'rgb(250, 250, 250)' }} />
              </AnimatedView>
            </TouchableScale>
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <AnimatedView
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 350
              }}
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(500)}>
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 13
                }}>
                관련된 강의가 없습니다.
              </Text>
            </AnimatedView>
          }
        />
      )}
    </Modal>
  )
}

export default RelatedLecturesModal
