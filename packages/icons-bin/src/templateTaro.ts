import { STYLESKEY } from './config'
import { camelCase } from './utils'

export const getAttrsTaro = (names: any) => {
  const { style } = names
  const baseAttrs = {
    xmlns: 'http://www.w3.org/2000/svg',
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

export const getElementCodeTaro = (
  ComponentName: string,
  attrs: string,
  svgCode: string,
) => {
  return `/* eslint-disable */
import { genIcon } from './gen'

const ${ComponentName} = genIcon((${getPropsStrTaro(ComponentName)}) => {

  return \`<svg ${attrs}>
      ${svgCode}
    </svg>\`
});

export default ${ComponentName}
`
}

/** 传入props */
export const getPropsStrTaro = (ComponentName: string) => {
  // filled和outlined
  if (
    ComponentName.includes(camelCase(STYLESKEY.FILLED)) ||
    ComponentName.includes(camelCase(STYLESKEY.OUTLINED))
  ) {
    return '{ color }'
  }
  // twotone
  if (ComponentName.includes(camelCase(STYLESKEY.TWOTONE))) {
    return '{ colors }'
  }
  return ''
}

/** genIcon */
export const genIconTaro = () => {
  return `import type { ViewProps } from '@tarojs/components'
import { View } from '@tarojs/components'
import React, { memo } from 'react'

export interface IconCommonProps extends Omit<ViewProps, 'children' | 'style'> {
  style?: React.CSSProperties
  /**
   * 图标大小
   * @default '16px'
   */
  size?: number | string

  /**
   * 图片颜色
   * @default '#1677ff'
   */
  color?: string

  /**
   * 颜色列表
   */
  colors?: string[]

  disabled?: boolean

  /**
   * 可点击的大小比例
   * @default 1.4
   */
  touchableScale?: number
}

type IconRender = (config: { color: string; colors: string[] }) => string

const defaultDisabledStyle: React.CSSProperties = {
  opacity: 0.4,
  pointerEvents: 'none',
}

/**
 * 生成 icon 组件
 */
export const genIcon = (render: IconRender): React.FC<IconCommonProps> => {
  return memo(
    ({
      size = '16px',
      color = '#1677ff',
      colors = [color, '#1677ff33'],
      disabled,
      touchableScale = 1.4,
      ...restProps
    }) => {
      return (
        <View
          {...restProps}
          style={{
            position: 'relative',
            display: 'inline-block',
            flexShrink: 0,
            width: size,
            height: size,
            backgroundImage:
              "url('data:image/svg+xml, " +
              encodeURIComponent(render({ color, colors })) +
              "')",
            ...(disabled ? defaultDisabledStyle : undefined),
            ...restProps.style,
          }}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              transform: 'scale(' + touchableScale + ')',
            }}
          />
        </View>
      )
    },
  )
}
`
}
