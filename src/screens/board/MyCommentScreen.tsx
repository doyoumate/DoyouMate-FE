import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { useQuery } from 'react-query'
import { getMyComments } from '../../module/comment/api.ts'
import MyCommentItem from '../../components/comment/MyCommentItem.tsx'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { AnimatedView } from '../../components/common/Animated.tsx'
import Text from '../../components/common/Text.tsx'
import { createSkeletonArray } from '../../lib/util/skeleton.ts'
import { SkeletonCommentItem } from '../../components/comment/CommentItem.tsx'

const MyCommentScreen = () => {
  const student = useSelector((store: Store) => store.student)
  const { data: comments, isLoading } = useQuery(['getMyComments'], getMyComments, {})
  const userIndex = useMemo(() => ({ [student.id]: 0 }), [student])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLoading ? (
          <FlatList
            data={createSkeletonArray(8)}
            showsVerticalScrollIndicator={false}
            renderItem={() => <SkeletonCommentItem />}
            contentContainerStyle={{ gap: 10 }}
          />
        ) : (
          <FlatList
            data={comments}
            renderItem={({ item }) => <MyCommentItem comment={item} userIndex={userIndex} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.4}
            ListEmptyComponent={
              <AnimatedView
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 500
                }}
                entering={FadeIn.duration(500)}
                exiting={FadeOut.duration(500)}>
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 14
                  }}>
                  댓글이 없습니다.
                </Text>
              </AnimatedView>
            }
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  line: {
    height: 0.4,
    marginVertical: 2,
    backgroundColor: 'rgb(200, 200, 200)'
  }
})

export default MyCommentScreen
