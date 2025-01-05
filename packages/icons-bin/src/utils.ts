/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import upperCamelCase from 'uppercamelcase'

export const parseName = (name: string, defaultStyle: any) => {
  const nameSlices = name.split('-')
  const style = nameSlices[nameSlices.length - 1]
  return {
    name,
    componentName: upperCamelCase(name),
    style: style === 'fill' || style === 'stroke' ? style : defaultStyle,
  }
}
