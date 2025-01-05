/* eslint-disable */
import React from 'react'
import { IconProps } from '../types'
import { spanStyles } from '../styles'

const EyeOutlined: React.FC<IconProps> = props => {
  let {
    color = 'currentColor',
    size = '1em',
    style = {},
    colors = ['#E3EEFF', '#333333'],
    rotate = 0,
    ...otherProps
  } = props
  color = style.color ? style.color : color
  size = style.fontSize ? style.fontSize : size
  let rotateTrans = 'rotate(' + rotate + 'deg)'

  const idMap = {}
  return (
    <span
      style={{
        ...spanStyles,
        ...style,
      }}
      {...otherProps}>
      <svg
        style={{ transform: rotateTrans }}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.4952 14.4624C4.61545 14.6342 4.73914 14.7991 4.86741 14.9583L4.86512 14.9606C5.20631 15.4723 5.08241 16.1622 4.58447 16.5232C4.08652 16.8842 3.39235 16.7874 3.01211 16.304C2.87697 16.1333 2.74642 15.957 2.61929 15.776C1.87031 14.7064 0.47998 12.5728 0.47998 12.0002C0.47998 11.4275 1.86916 9.2928 2.61815 8.22429C7.17622 1.71129 16.8226 1.71129 21.3818 8.22429C22.1308 9.2928 23.52 11.4722 23.52 12.0002C23.52 12.527 22.1308 14.7075 21.3818 15.776C18.048 20.5391 11.9931 21.8183 7.19683 19.6149L7.19798 19.6114C6.81124 19.4392 6.55104 19.0677 6.52139 18.6454C6.49175 18.2231 6.69749 17.8189 7.05638 17.5944C7.41526 17.3698 7.86875 17.3616 8.23557 17.5729V17.5695C12.0607 19.2828 16.857 18.2463 19.5048 14.4624C19.8518 13.9677 20.3534 13.2049 20.7611 12.5178C20.8733 12.3265 20.973 12.1525 21.0566 12.0002C20.973 11.8478 20.8733 11.6726 20.7611 11.4825C20.3653 10.82 19.9467 10.1714 19.5059 9.53788C15.8595 4.32702 8.14166 4.32702 4.4952 9.53788C4.14247 10.0418 3.64085 10.7954 3.23544 11.4722C3.11977 11.668 3.01784 11.8455 2.93424 12.0002C3.01784 12.1548 3.11977 12.3323 3.23658 12.5281C3.63473 13.1868 4.05489 13.8319 4.49635 14.4624H4.4952ZM14.2916 12.0002C14.2916 11.1818 13.855 10.4257 13.1464 10.0165C12.4377 9.60738 11.5646 9.60738 10.8559 10.0165C10.1472 10.4257 9.71064 11.1818 9.71064 12.0002C9.71064 13.2652 10.7361 14.2906 12.0011 14.2906C13.2661 14.2906 14.2916 13.2652 14.2916 12.0002ZM12.0011 16.5811C14.5311 16.5811 16.5821 14.5302 16.5821 12.0002C16.5821 9.47015 14.5311 7.41918 12.0011 7.41918C9.47112 7.41918 7.42015 9.47015 7.42015 12.0002C7.42015 14.5302 9.47112 16.5811 12.0011 16.5811Z"
          fill="black"></path>
      </svg>
    </span>
  )
}

export default EyeOutlined