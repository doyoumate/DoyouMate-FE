import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native'
import React, { ForwardedRef } from 'react'

type TextProps<T extends { style?: StyleProp<TextStyle> }> = Omit<T, 'style'> & {
  readonly style?: Omit<TextStyle, 'fontWeight' | 'fontFamily'> & {
    fontWeight?: keyof typeof fonts
  }
}

const fonts = {
  light: 'NanumSquare_acL',
  normal: 'NanumSquare_acR',
  bold: 'NanumSquare_acB',
  extra: 'NanumSquare_acEB'
} as const

const Text = ({ style, ...props }: TextProps<RNTextProps>, ref: ForwardedRef<any>) => {
  return (
    <RNText
      {...props}
      style={{
        ...style,
        fontWeight: undefined,
        fontFamily: fonts[style?.fontWeight ?? 'normal']
      }}
    />
  )
}

export { fonts }
export type { TextProps }
export default Text
