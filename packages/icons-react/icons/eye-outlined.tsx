/* eslint-disable */
import React from 'react';
import { IconProps } from '../types';
import { spanStyles } from '../styles';

const EyeOutlined:React.FC<IconProps> = (props) => {
  let { color='currentColor', size='1em', style={}, rotate=0, ...otherProps } = props;
  color = style.color ? style.color : color;
  size = style.fontSize ? style.fontSize  : size;
  let rotateTrans = 'rotate(' + rotate + 'deg)';
  
  
  return (
    <span
      style={{
      ...spanStyles,
      ...style,
    }}
    {...otherProps}
  >
    <svg style={{transform: rotateTrans}} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path fillRule="evenodd" d="M4.495 14.462q.18.258.372.496l-.002.003a1.145 1.145 0 0 1-1.853 1.343q-.202-.256-.393-.528C1.87 14.706.48 12.573.48 12c0-.572 1.39-2.707 2.138-3.776 4.558-6.513 14.205-6.513 18.764 0C22.13 9.293 23.52 11.472 23.52 12s-1.39 2.707-2.138 3.776c-3.334 4.763-9.389 6.042-14.185 3.839l.001-.004a1.145 1.145 0 1 1 1.038-2.038v-.003c3.825 1.713 8.621.676 11.269-3.108.347-.494.848-1.257 1.256-1.944q.169-.289.296-.518a19 19 0 0 0-.296-.518 33 33 0 0 0-1.255-1.944c-3.646-5.211-11.364-5.211-15.01 0a35 35 0 0 0-1.26 1.934q-.175.295-.302.528.127.233.303.528.597.989 1.26 1.934zM14.292 12a2.29 2.29 0 1 0-4.582 0 2.29 2.29 0 0 0 4.582 0m-2.29 4.581a4.58 4.58 0 1 0 0-9.162 4.58 4.58 0 0 0 0 9.162" clipRule="evenodd"></path>
    </svg>
  </span>
  )
};

export default EyeOutlined
