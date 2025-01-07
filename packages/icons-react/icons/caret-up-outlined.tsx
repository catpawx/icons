/* eslint-disable */
import React from 'react';
import { IconProps } from '../types';
import { spanStyles } from '../styles';

const CaretUpOutlined:React.FC<IconProps> = (props) => {
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
      <path d="m20.13 16.148-7.696-8.925a.586.586 0 0 0-.868 0L3.87 16.15c-.286.332-.029.82.433.82h15.394c.462 0 .72-.488.433-.82"></path>
    </svg>
  </span>
  )
};

export default CaretUpOutlined
