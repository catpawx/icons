import type React from 'react'
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string
  size?: string | number
  rotate?: number
  style?: React.CSSProperties
  className?: string
  colors?: string[]
}
