import React, { Component } from 'react'
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle as RNTextStyle } from 'react-native'

type TextStyle = Omit<RNTextStyle, 'fontWeight' | 'fontFamily'> & {
  fontWeight?: keyof typeof fonts
}

type TextProps<T extends { style?: StyleProp<RNTextStyle> }> = Omit<T, 'style'> & {
  readonly style?: TextStyle
}

const fonts = {
  light: 'NanumSquare_acL',
  normal: 'NanumSquare_acR',
  bold: 'NanumSquare_acB',
  extra: 'NanumSquare_acEB'
} as const

class Text extends Component<TextProps<RNTextProps>> {
  render() {
    const { style, ...props } = this.props
    const fontFamily = fonts[style?.fontWeight ?? 'normal']

    return (
      <RNText
        {...props}
        allowFontScaling={false}
        style={{
          ...style,
          fontWeight: undefined,
          fontFamily: fontFamily
        }}
      />
    )
  }
}

export { fonts }
export type { TextProps, TextStyle }
export default Text
