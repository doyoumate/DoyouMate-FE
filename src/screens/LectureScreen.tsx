import { useEffect, useState } from 'react'
import { getLectures } from '../module/lecture/api.ts'
import { Lecture } from '../module/lecture/lecture'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, StyleSheet } from 'react-native'
import LectureItem from '../components/LectureItem.tsx'

const LectureScreen = () => {
  const [lectures, setLectures] = useState<Lecture[]>([])

  useEffect(() => {
    getLectures().then(response => setLectures(response))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={lectures}
        renderItem={({ item }) => <LectureItem lecture={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10
  },
  list: { width: '100%' }
})

export default LectureScreen
