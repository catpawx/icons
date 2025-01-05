import { STYLESKEY } from './config'

export const getAttrs = (names: any) => {
  const { style } = names
  const baseAttrs = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 'size',
    height: 'size',
    viewBox: '0 0 24 24',
  }
  const fillAttrs = {
    fill: 'color',
  }
  const multiToneAttrs = {
    fill: 'none',
  }

  let result = Object.assign({}, baseAttrs)

  if (style === STYLESKEY.OUTLINED) {
    result = Object.assign({}, result, fillAttrs)
  }

  if (style === STYLESKEY.MULTITONE) {
    result = Object.assign({}, result, multiToneAttrs)
  }

  return result
}

export const getElementCode = (
  ComponentName: string,
  attrs: string,
  svgCode: string,
) => {
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

  idMapToNewIdStr = `const idMap = {${idMapToNewIdStr}}`

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

  return `
  /* eslint-disable */
  import React from 'react';
  import { IconProps } from '../types';
  import { spanStyles } from '../styles';

  const ${ComponentName}:React.FC<IconProps> = (props) => {
    let { color='currentColor', size="1em", style={}, colors=['#E3EEFF','#333333'],rotate=0, ...otherProps } = props;
    color = style.color ? style.color : color ;
    size = style.fontSize ? style.fontSize  : size ;
    let rotateTrans = 'rotate(' + rotate + 'deg)';

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
