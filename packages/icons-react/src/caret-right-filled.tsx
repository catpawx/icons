/* eslint-disable */
import React from 'react';
import { IconProps } from './types';
import { spanStyles } from './styles';

const CaretRightFilled:React.FC<IconProps> = (props) => {
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
      <path d="M16.777 11.566 7.852 3.87c-.333-.286-.82-.029-.82.433v15.394c0 .462.487.72.82.433l8.925-7.696a.587.587 0 0 0 0-.868"></path>
    </svg>
  </span>
  )
};

export default CaretRightFilled
