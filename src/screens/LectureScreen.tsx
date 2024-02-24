import { useEffect, useState } from 'react'
import { searchLectures } from '../module/lecture/api.ts'
import { Lecture, SearchLecturesRequest } from '../module/lecture/lecture'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, StyleSheet } from 'react-native'
import LectureItem from '../components/LectureItem.tsx'
import Filter from '../components/Filter.tsx'
import SearchBar from '../components/SearchBar.tsx'

const LectureScreen = () => {
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [request, setRequest] = useState<SearchLecturesRequest>({ name: '' })

  useEffect(() => {
    searchLectures(request).then(response => setLectures(response))
  }, [request])

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar setRequest={setRequest} />
      <Filter request={request} setRequest={setRequest} />
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
    gap: 8,
    padding: 10
  },
  list: {
    width: '100%',
    marginTop: 5
  }
})

export default LectureScreen
