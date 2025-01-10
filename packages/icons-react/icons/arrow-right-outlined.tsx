/* eslint-disable */
import React from 'react';
import { IconProps } from '../types';
import { spanStyles } from '../styles';

const ArrowRightOutlined:React.FC<IconProps> = (props) => {
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
      <path d="m20.367 11.433-8.855-7.685a.38.38 0 0 0-.246-.092H9.192a.187.187 0 0 0-.122.328l8.208 7.125H3.563a.19.19 0 0 0-.188.188v1.406c0 .103.084.188.188.188h13.713l-8.208 7.125a.187.187 0 0 0 .122.328h2.144a.18.18 0 0 0 .122-.047l8.911-7.73a.753.753 0 0 0 0-1.134"></path>
    </svg>
  </span>
  )
};

export default ArrowRightOutlined