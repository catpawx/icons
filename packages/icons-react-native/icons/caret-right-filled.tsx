/* eslint-disable */
import React from 'react';
 import {Svg, Path } from 'react-native-svg'
import { genIcon } from '../gen'

const CaretRightFilled = genIcon(({ size, color }, props) => {

  return <Svg {...props} width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M16.777 11.566 7.852 3.87c-.333-.286-.82-.029-.82.433v15.394c0 .462.487.72.82.433l8.925-7.696a.587.587 0 0 0 0-.868"></Path>
    </Svg>
});

export default CaretRightFilled
