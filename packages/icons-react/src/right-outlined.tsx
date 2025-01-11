/* eslint-disable */
import React from 'react';
import { IconProps } from './types';
import { spanStyles } from './styles';

const RightOutlined:React.FC<IconProps> = (props) => {
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
      <path d="M17.946 11.41 7.38 3.156a.187.187 0 0 0-.302.148v1.811c0 .115.054.225.143.296L15.66 12 7.22 18.588a.37.37 0 0 0-.143.296v1.811c0 .157.18.244.302.148l10.566-8.252a.748.748 0 0 0 0-1.182"></path>
    </svg>
  </span>
  )
};

export default RightOutlined
