import { Ionicons } from '../../lib/icon/icons.ts'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Dispatch, SetStateAction } from 'react'
import { useDebouncing } from '../../lib/hooks/useDebouncing.ts'
import useInput from '../../lib/hooks/useInput.ts'
import TextInput from './TextInput.tsx'

interface Props {
  setText: Dispatch<SetStateAction<string>>
  placeholder: string
}

const SearchBar = ({ setText, placeholder }: Props) => {
  const textInputStates = useInput('text', { maxLength: 30 })
  const { value: text, ref: textRef } = textInputStates

  useDebouncing(
    () => {
      setText(text)
    },
    300,
    [text]
  )

  return (
    <TouchableWithoutFeedback onPress={textRef.current?.focus}>
      <View style={styles.container}>
        <Ionicons name="search" size={15} color="grey" />
        <TextInput
          {...textInputStates}
          style={{
            width: '90%',
            fontWeight: 'light'
          }}
          maxLength={textInputStates.options?.maxLength}
          placeholder={placeholder}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 42,
    paddingLeft: 12,
    paddingRight: 22,
    borderRadius: 10,
    backgroundColor: 'rgb(250, 250, 250)'
  }
})

export default SearchBar
