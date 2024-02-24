import { Ionicons } from '../lib/icon.ts'
import { StyleSheet, TextInput, View } from 'react-native'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'
import { SearchLecturesRequest } from '../module/lecture/lecture'
import { useDebounce } from '../lib/debounce.ts'

interface Props {
  setRequest: Dispatch<SetStateAction<SearchLecturesRequest>>
}

const SearchBar = ({ setRequest }: Props) => {
  const [name, setName] = useState('')
  const debouncedName = useDebounce(name, 300)
  const onChangeTextHandler = useCallback((text: string) => {
    setName(text)
  }, [])

  useEffect(() => {
    setRequest(current => ({ ...current, name: debouncedName }))
  }, [debouncedName, setRequest])

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={15} color="grey" />
      <TextInput
        placeholder="강의명을 입력해주세요."
        onChangeText={onChangeTextHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    width: '100%',
    height: 38,
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 22,
    borderRadius: 10,
    backgroundColor: 'rgb(250, 250, 250)',
    shadowColor: 'rgb(150, 150, 255)',
    shadowOffset: {
      width: 0.2,
      height: 0.2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5
  }
})

export default SearchBar
