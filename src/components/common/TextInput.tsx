import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native'
import { fonts, TextProps } from './Text.tsx'
import { InputStates } from '../../lib/hooks/useInput.ts'

type TextInputProps = TextProps<RNTextInputProps> & { inputStates?: InputStates }

const hitSlop = {
  top: 15,
  left: 10,
  right: 10,
  bottom: 15
}

const TextInput = ({ style, inputStates, ...props }: TextInputProps) => {
  const { value, setValue, setIsFocused, ref, isMasked } = { ...inputStates }

  return (
    <RNTextInput
      hitSlop={hitSlop}
      placeholderTextColor="grey"
      style={{
        ...style,
        fontWeight: undefined,
        fontFamily: fonts[style?.fontWeight ?? 'normal']
      }}
      {...(inputStates && {
        onChangeText: text => {
          setValue && setValue(text)
          props.onChangeText && props.onChangeText(text)
        },
        onFocus: e => {
          props.onFocus && props.onFocus(e)
          setIsFocused!!(true)
        },
        onBlur: e => {
          props.onBlur && props.onBlur(e)
          setIsFocused!!(false)
        },
        ref,
        value,
        secureTextEntry: isMasked
      })}
      {...props}
    />
  )
}

export type { TextInputProps }
export default TextInput
