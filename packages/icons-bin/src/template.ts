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

export const getElementCode = (
  ComponentName: string,
  attrs: string,
  svgCode: string,
) => {
  const { newSvgCode, idMapToNewIdStr } = generateDefsId(svgCode)
  return `/* eslint-disable */
import React from 'react';
import { IconProps } from '../types';
import { spanStyles } from '../styles';

const ${ComponentName}:React.FC<IconProps> = (props) => {
  ${getPropsStr(ComponentName)}
  ${idMapToNewIdStr}
  return (
    <span
      style={{
      ...spanStyles,
      ...style,
    }}
    {...otherProps}
  >
    <svg style={{transform: rotateTrans}} ${attrs}>
      ${newSvgCode}
    </svg>
  </span>
  )
};

export default ${ComponentName}
`
}

export const getStyles = () => {
  return `import type React from 'react'
export const spanStyles: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  color: 'inherit',
  fontStyle: 'normal',
  lineHeight: 0,
  textAlign: 'center',
  textTransform: 'none',
  verticalAlign: '-0.125em',
  textRendering: 'optimizeLegibility',
}
`
}
export const getTypes = () => {
  return `import type React from 'react'
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string
  size?: string | number
  rotate?: number
  style?: React.CSSProperties
  className?: string
  colors?: string[]
}
  `
}

/** 处理存在defs id引用的情况，他在与tabs等组件使用时id相同会有bug */
const generateDefsId = (svgCode: string) => {
  // 搜集svgCode中的 url(#pattern0_1559_247) 提取pattern0_1559_247
  const idMap: { [key: string]: boolean } = {}
  const idReg = /url\(#(.*?)\)/g
  let match = idReg.exec(svgCode)
  while (match) {
    idMap[match[1]] = true
    match = idReg.exec(svgCode)
  }
  // 用idMap生成idMapToNewIdStr={pattern0_1559_247:new Date().getTime().toString(36) + Math.random().toString(36).slice(2)}
  let idMapToNewIdStr = ''
  idMapToNewIdStr = Object.keys(idMap).reduce((acc, key) => {
    acc += `${key}:new Date().getTime().toString(36) + Math.random().toString(36).slice(2),`
    return acc
  }, '')

  idMapToNewIdStr = idMapToNewIdStr ? `const idMap = {${idMapToNewIdStr}}` : ''

  // 将svgCode中的=url(#pattern0_1559_247)替换为url(#${idMap['pattern0_1559_247']})，id="pattern0_1559_247"替换为id="${idMap['pattern0_1559_247']}"
  let newSvgCode = svgCode
  Object.keys(idMap).forEach(key => {
    newSvgCode = newSvgCode.replace(
      new RegExp(`="url\\(#${key}\\)"`, 'g'),
      '={`url(#${idMap["' + key + '"]})`}',
    )
    newSvgCode = newSvgCode.replace(
      new RegExp(`id="${key}"`, 'g'),
      'id={`${idMap["' + key + '"]}`}',
    )
  })

  return { idMapToNewIdStr, newSvgCode }
}

/** 解构属性props字符串 */
const getPropsStr = (ComponentName: string) => {
  let propsStr =
    "let { size='1em', style={}, rotate=0, ...otherProps } = props;"

  const commonStr = `
  size = style.fontSize ? style.fontSize  : size;
  let rotateTrans = 'rotate(' + rotate + 'deg)';
  `
  // filled和outlined
  if (
    ComponentName.includes(camelCase(STYLESKEY.FILLED)) ||
    ComponentName.includes(camelCase(STYLESKEY.OUTLINED))
  ) {
    propsStr = `let { color='currentColor', size='1em', style={}, rotate=0, ...otherProps } = props;
  color = style.color ? style.color : color;`
  }
  // twotone
  if (ComponentName.includes(camelCase(STYLESKEY.TWOTONE))) {
    propsStr = `let { color='#1677ff', size='1em', style={},colors=[color,'#1677ff33'], rotate=0, ...otherProps } = props;
  colors = style.color ? [style.color, colors[1]] : colors`
  }
  // 默认多彩
  return propsStr + commonStr
}
