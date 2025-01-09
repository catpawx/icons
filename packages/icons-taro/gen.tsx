import type { ViewProps } from '@tarojs/components'
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
              "url('data:image/svg+xml;charset=utf8," +
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
