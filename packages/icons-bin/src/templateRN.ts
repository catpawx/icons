import { STYLESKEY } from './config'
import { camelCase } from './utils'

export const getAttrs = (names: any) => {
  const { style } = names
  const baseAttrs = {
    // xmlns: 'http://www.w3.org/2000/svg',
    width: 'size',
    height: 'size',
    viewBox: '0 0 24 24',
  }
  const fillAttrs = {
    fill: 'color',
  }
  const multiToneAttrs = {
    fill: '"none"',
  }

  let result = Object.assign({}, baseAttrs)

  if (style === STYLESKEY.OUTLINED || style === STYLESKEY.FILLED) {
    result = Object.assign({}, result, fillAttrs)
  }

  if (style === STYLESKEY.MULTITONE || style === STYLESKEY.TWOTONE) {
    result = Object.assign({}, result, multiToneAttrs)
  }

  return result
}

export const getElementCodeRN = (
  ComponentName: string,
  attrs: string,
  svgCode: string,
) => {
  return `/* eslint-disable */
import React from 'react';
import { Path, Svg } from 'react-native-svg'
import { genIcon } from '../gen'

const ${ComponentName} = genIcon(({ size, color }, props) => {
  ${getPropsStrRN(ComponentName)}
  return <Svg {...props} ${attrs}>
      ${svgCode}
    </Svg>
});

export default ${ComponentName}
`
}

/** 解构属性props字符串 */
const getPropsStrRN = (ComponentName: string) => {
  let propsStr = 'let { style={} } = props;'

  const commonStr = `
  size = style.fontSize ? style.fontSize  : size;
  `
  // filled和outlined
  if (
    ComponentName.includes(camelCase(STYLESKEY.FILLED)) ||
    ComponentName.includes(camelCase(STYLESKEY.OUTLINED))
  ) {
    propsStr =
      propsStr +
      `
  color = style.color ? style.color : color;`
  }
  // twotone
  if (ComponentName.includes(camelCase(STYLESKEY.TWOTONE))) {
    propsStr =
      propsStr +
      `
  colors = style.color ? [style.color, colors[1]] : colors`
  }
  // 默认多彩
  return propsStr + commonStr
}
