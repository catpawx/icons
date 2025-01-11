/* eslint-disable */
import React from 'react';
import { IconProps } from './types';
import { spanStyles } from './styles';

const FolderOrangeMultiTone:React.FC<IconProps> = (props) => {
  let { size='1em', style={}, rotate=0, ...otherProps } = props;
  size = style.fontSize ? style.fontSize  : size;
  let rotateTrans = 'rotate(' + rotate + 'deg)';
  
  const idMap = {paint0_linear_156_19:new Date().getTime().toString(36) + Math.random().toString(36).slice(2),paint1_linear_156_19:new Date().getTime().toString(36) + Math.random().toString(36).slice(2),paint2_linear_156_19:new Date().getTime().toString(36) + Math.random().toString(36).slice(2),paint3_linear_156_19:new Date().getTime().toString(36) + Math.random().toString(36).slice(2),}
  return (
    <span
      style={{
      ...spanStyles,
      ...style,
    }}
    {...otherProps}
  >
    <svg style={{transform: rotateTrans}} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={"none"}>
      <path d="M1.50024 4.98519C1.50024 4.09 2.22595 3.36429 3.12115 3.36429H9.4313C9.85061 3.36429 10.2536 3.52677 10.5556 3.81762L10.9938 4.23953C11.2958 4.53038 11.6988 4.69286 12.1181 4.69286H18.4793C19.3745 4.69286 20.1002 5.41857 20.1002 6.31376V19.0148C20.1002 19.91 19.3745 20.6357 18.4793 20.6357H3.12115C2.22595 20.6357 1.50024 19.91 1.50024 19.0148V4.98519Z" fill={`url(#${idMap["paint0_linear_156_19"]})`}></path><path d="M6.42455 9.35613C6.61242 8.70988 6.70636 8.38675 6.95445 8.2005C7.20256 8.01425 7.53895 8.01425 8.21177 8.01425H20.4646C21.5241 8.01425 22.0538 8.01425 22.3329 8.35827C22.6121 8.70231 22.5029 9.22068 22.2847 10.2574L20.4107 19.1589C20.2618 19.8663 20.1873 20.22 19.9312 20.4278C19.675 20.6357 19.3136 20.6357 18.5906 20.6357H2.82837C3.51556 19.8884 3.51556 19.141 4.20275 16.8991C4.69577 15.2906 5.82549 11.4168 6.42455 9.35613Z" fill="#FFFDD3" fillOpacity="0.5"></path><path d="M8.21208 8.11563H20.4649C20.9978 8.11563 21.3864 8.11588 21.6773 8.15761C21.9655 8.19894 22.138 8.27857 22.2546 8.42218C22.3712 8.56579 22.4135 8.75108 22.3946 9.04158C22.3755 9.33482 22.2956 9.71517 22.1859 10.2366L20.3119 19.1381C20.2369 19.4943 20.1824 19.7524 20.1156 19.9481C20.0497 20.1411 19.9754 20.2618 19.8676 20.3493C19.7599 20.4367 19.6264 20.4845 19.424 20.5092C19.2188 20.5343 18.9549 20.5345 18.5909 20.5345H3.0481C3.31253 20.1984 3.4639 19.8432 3.61273 19.3576C3.68445 19.1236 3.75615 18.8574 3.83954 18.5478C3.85677 18.4838 3.8745 18.418 3.89283 18.3502C4.00009 17.9536 4.12859 17.4878 4.29991 16.9288C4.79321 15.3195 5.92318 11.4448 6.52213 9.38448C6.61673 9.05906 6.6854 8.82341 6.76055 8.64525C6.83468 8.46957 6.91112 8.36001 7.01557 8.2816C7.12003 8.20317 7.24658 8.16035 7.43592 8.13824C7.6279 8.1158 7.87327 8.11563 8.21208 8.11563Z" stroke={`url(#${idMap["paint1_linear_156_19"]})`} strokeWidth="0.5"></path><path d="M4.82197 4.74246H7.47911C7.8186 4.74246 8.0938 5.01768 8.0938 5.35716C8.0938 5.69665 7.8186 5.97185 7.47911 5.97185H4.82197C4.48248 5.97185 4.20728 5.69665 4.20728 5.35716C4.20728 5.01768 4.48248 4.74246 4.82197 4.74246Z" fill={`url(#${idMap["paint2_linear_156_19"]})`} fillOpacity="0.9" stroke={`url(#${idMap["paint3_linear_156_19"]})`} strokeWidth="0.5"></path><defs><linearGradient id={`${idMap["paint0_linear_156_19"]}`} x1="-2.054" y1="-0.707161" x2="16.5864" y2="17.1228" gradientUnits="userSpaceOnUse"><stop stopColor="#FFF95B"></stop><stop offset="1" stopColor="#FF930F"></stop></linearGradient><linearGradient id={`${idMap["paint1_linear_156_19"]}`} x1="1.83224" y1="8.91585" x2="8.87669" y2="25.9034" gradientUnits="userSpaceOnUse"><stop stopColor="white"></stop><stop offset="0.765625" stopColor="white" stopOpacity="0"></stop></linearGradient><linearGradient id={`${idMap["paint2_linear_156_19"]}`} x1="3.85477" y1="4.6041" x2="9.30978" y2="6.21581" gradientUnits="userSpaceOnUse"><stop stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></linearGradient><linearGradient id={`${idMap["paint3_linear_156_19"]}`} x1="3.48282" y1="4.97604" x2="6.15054" y2="6.02144" gradientUnits="userSpaceOnUse"><stop stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></linearGradient></defs>
    </svg>
  </span>
  )
};

export default FolderOrangeMultiTone
