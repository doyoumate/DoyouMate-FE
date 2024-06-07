import { ForwardedRef, forwardRef } from 'react'
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native'
import { fonts, TextProps } from './Text.tsx'
import { InputStates } from '../../lib/hooks/useInput.ts'

type TextInputProps = TextProps<RNTextInputProps> & { inputStates?: InputStates }

const TextInput = ({ style, inputStates, ...props }: TextInputProps, ref: ForwardedRef<RNTextInput>) => {
  const { value, setValue, setIsFocused, isMasked } = { ...inputStates }

  return (
    <RNTextInput
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
        value,
        ref,
        isMasked
      })}
      {...props}
    />
  )
}

export type { TextInputProps }
export default forwardRef(TextInput)
