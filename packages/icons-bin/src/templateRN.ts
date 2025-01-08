import { STYLESKEY } from './config'
import { camelCase } from './utils'

export const getAttrsRN = (names: any) => {
  const { style } = names
  const baseAttrs = {
    width: 'size',
    height: 'size',
    viewBox: '0 0 24 24',
  }
  const fillAttrs = {
    fill: 'color',
  }
  const multiToneAttrs = {
    fill: '"none"',
  }

  let result = Object.assign({}, baseAttrs)

  if (style === STYLESKEY.OUTLINED || style === STYLESKEY.FILLED) {
    result = Object.assign({}, result, fillAttrs)
  }

  if (style === STYLESKEY.MULTITONE || style === STYLESKEY.TWOTONE) {
    result = Object.assign({}, result, multiToneAttrs)
  }

  return result
}

export const getElementCodeRN = (
  ComponentName: string,
  attrs: string,
  svgCode: string,
) => {
  const { newSvgCode, importStrRN } = getImportStrRNAndNewSvgCode(svgCode)
  return `/* eslint-disable */
import React from 'react';
 ${importStrRN}
import { genIcon } from '../gen'

const ${ComponentName} = genIcon((${getPropsStrRN(ComponentName)}, props) => {

  return <Svg {...props} ${attrs}>
      ${newSvgCode}
    </Svg>
});

export default ${ComponentName}
`
}

/** 从react-native-svg中导入哪些标签 */
export const getImportStrRNAndNewSvgCode = (svgCode: string) => {
  const tagsSet = new Set()
  // 匹配svgCode中的标签,把svgCode中标签变为首字符大写，并且提取出来
  const reg = /(<\/|<)([A-z]+)/g

  const newSvgCode = svgCode.replace(reg, (_, __, tag) => {
    const tagCamel = camelCase(tag)
    tagsSet.add(tagCamel)
    if (__ === '</') {
      return `</${tagCamel}`
    }
    return `<${tagCamel}`
  })
  return {
    importStrRN: `import {Svg, ${Array.from(tagsSet).join(', ')} } from 'react-native-svg'`,
    newSvgCode,
  }
}

/** 传入props */
export const getPropsStrRN = (ComponentName: string) => {
  // filled和outlined
  if (
    ComponentName.includes(camelCase(STYLESKEY.FILLED)) ||
    ComponentName.includes(camelCase(STYLESKEY.OUTLINED))
  ) {
    return '{ size, color }'
  }
  // twotone
  if (ComponentName.includes(camelCase(STYLESKEY.TWOTONE))) {
    return '{ size, colors }'
  }
  return '{ size }'
}

/** genIcon */
export const genIconRN = () => {
  return `
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import React, { memo } from 'react'
import type {
  ColorValue,
  TouchableWithoutFeedbackProps,
  ViewProps,
  ViewStyle,
} from 'react-native'
import { TouchableWithoutFeedback, View } from 'react-native'
import type { SvgProps } from 'react-native-svg/lib/typescript/elements/Svg'

export interface IconCommonProps extends SvgProps {
  /**
   * 图标大小
   * @default 24
   */
  size?: number

  /**
   * 图片颜色
   * @default '#1677ff'
   */
  color?: ColorValue

  /**
   * 颜色列表
   */
  colors?: ColorValue[]

  /**
   * svg 内部的样式
   */
  svgStyle?: ViewProps['style']

  /**
   * 可点击的范围大小
   * @default 44
   */
  touchableSize?: number
}

type IconRender = (
  config: { size: number; color: ColorValue; colors: ColorValue[] },
  props: ViewProps,
) => React.ReactElement

const defaultStyle: ViewStyle = {
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
}

const defaultDisabledStyle: ViewStyle = {
  opacity: 0.4,
}

const getDefaultValue = <T,>(value: T, defaultValue: T): T => {
  return value !== undefined ? value : defaultValue
}

/** 可点击元素的属性字段 */
const touchablePropsFields: (keyof TouchableWithoutFeedbackProps)[] = [
  'delayLongPress',
  'delayPressIn',
  'delayPressOut',
  'disabled',
  'hitSlop',
  'onBlur',
  'onFocus',
  'onLongPress',
  'onPress',
  'onPressIn',
  'onPressOut',
  'pressRetentionOffset',
]

/**
 * 挑选出点击事件的属性
 */
export const pickTouchablePropsField = (
  props: Partial<ViewProps & TouchableWithoutFeedbackProps>,
) => {
  return pick(props, touchablePropsFields)
}

/**
 * 排除点击事件的属性
 */
export const omitTouchablePropsField = (props: ViewProps) => {
  return omit(props, touchablePropsFields)
}

/**
 * 生成一个 icon 组件
 */
export const genIcon = (render: IconRender): React.FC<IconCommonProps> => {
  return memo(
    ({
      size = 24,
      color = '#1677ff',
      colors = [color, '#1677ff33'],
      svgStyle,
      touchableSize = 44,

      // 点击相关的属性
      style,
      hitSlop,
      ...restProps
    }) => {
      const hitSlopSize = (touchableSize - size) / 2
      const iconHitSlop = getDefaultValue(hitSlop, {
        left: hitSlopSize,
        right: hitSlopSize,
        top: hitSlopSize,
        bottom: hitSlopSize,
      })
      const viewStyle = getDefaultValue(style, defaultStyle)
      const _svgStyle = getDefaultValue(svgStyle, defaultStyle)

      /** 适用于点击的属性 */
      const touchableOpacityProps = pickTouchablePropsField(restProps)
      /** 剔除点击相关的属性 */
      const svgProps = omitTouchablePropsField(restProps)

      return (
        <TouchableWithoutFeedback
          {...touchableOpacityProps}
          hitSlop={iconHitSlop}>
          <View
            style={
              restProps.disabled ? [viewStyle, defaultDisabledStyle] : viewStyle
            }
            pointerEvents={
              !isNil(touchableOpacityProps.onPress)
                ? svgProps.pointerEvents
                : 'none'
            }>
            {render(
              {
                color,
                size,
                colors,
              },
              {
                style: _svgStyle,
                ...svgProps,
              },
            )}
          </View>
        </TouchableWithoutFeedback>
      )
    },
  )
}
`
}
