import { Ionicons } from '../lib/icon.ts'
import { StyleSheet, TextInput, View } from 'react-native'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDebouncedValue } from '../lib/debounce.ts'

interface Props {
  setContent: Dispatch<SetStateAction<string>>
  placeholder: string
}

const SearchBar = ({ setContent, placeholder }: Props) => {
  const [text, setText] = useState('')
  const debouncedText = useDebouncedValue(text, 300)

  useEffect(() => {
    setContent(debouncedText)
  }, [debouncedText, setContent])

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={15} color="grey" />
      <TextInput
        style={{
          width: '90%',
          fontFamily: 'NanumSquare_acL'
        }}
        value={text}
        maxLength={30}
        placeholder={placeholder}
        placeholderTextColor="grey"
        onChangeText={text => setText(text)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
    height: 42,
    paddingLeft: 12,
    paddingRight: 22,
    borderRadius: 10,
    backgroundColor: 'rgb(250, 250, 250)'
  }
})

export default SearchBar
