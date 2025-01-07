import fs from 'node:fs'
import path from 'node:path'

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import upperCamelCase from 'uppercamelcase'

import { STYLESKEY } from './config'

export const parseName = (name: string, defaultStyle: any) => {
  // 根据name关键字判断图标样式
  let style = ''
  Object.keys(STYLESKEY).forEach(key => {
    if (name.indexOf(STYLESKEY[key as keyof typeof STYLESKEY]) !== -1) {
      style = STYLESKEY[key as keyof typeof STYLESKEY]
    }
  })

  return {
    name,
    componentName: upperCamelCase(name),
    style: style || defaultStyle,
  }
}

/**
 * 转换为two-tone -> TwoTone
 * @param {string} str
 * @returns {string}
 */
export function camelCase(str: string): string {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

export function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

export function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}
