import * as cheerio from 'cheerio'
import type { PluginConfig } from 'svgo'
import { optimize as svgoOptimize } from 'svgo'

import { STYLESKEY } from './config'
import { camelCase } from './utils'

/**
 * 用svgo优化SVG
 * @param {string} svg
 * @returns {Promise<string>}
 */
function optimize(svg: string, names: any): Promise<string> {
  const { style } = names
  // 插件
  let plugins: PluginConfig[] = [
    {
      name: 'removeXlink',
    },
  ]
  // fill填充、stroke描边才需要的插件
  if (style === STYLESKEY.OUTLINED || style === STYLESKEY.FILLED) {
    plugins = plugins.concat([
      {
        name: 'preset-default',
        params: {
          overrides: {
            convertShapeToPath: false,
            mergePaths: false,
          },
        },
      },
      {
        name: 'removeAttrs',
        params: {
          elemSeparator: ',',
          attrs: ['stroke', 'fill'],
        },
      },
    ])
  }
  const result = svgoOptimize(svg, {
    plugins,
  })

  return new Promise(resolve => {
    resolve(result.data)
  })
}

/**
 * 移除SVG元素.
 * @param {string} svg
 * @returns {string}
 */
function removeSVGElement(svg: string): string {
  const $ = cheerio.load(svg)
  return $('body').children().html() || ''
}

/**
 * 处理two-tone图标
 * @param {string} svg - An SVG string.
 * @returns {string}
 */
function handleTwoTone(svg: string, names: any) {
  const { OUTPUT_TYPE } = process.env
  if (names.style === STYLESKEY.TWOTONE) {
    // 储存color
    const colorMap = new Map()
    svg = svg.replace(/(fill)="(#[A-z0-9]{6})"/g, (_, a, b) => {
      // 判断colorMap中是否有该颜色
      if (!colorMap.has(b)) {
        const size = colorMap.size
        colorMap.set(b, size)
        if (OUTPUT_TYPE === 'taro') {
          return `${a}="\${colors[${size}]}"`
        } else {
          return `${a}={colors[${size}]}`
        }
      } else {
        if (OUTPUT_TYPE === 'taro') {
          return `${a}="\${colors[${colorMap.get(b)}]}"`
        } else {
          return `${a}={colors[${colorMap.get(b)}]}`
        }
      }
    })
  }

  return svg
}

/**
 * 处理SVG字符串
 * @param {string} svg
 * @param {Promise<string>}
 */
async function processSvg(svg: string, names: any) {
  const { OUTPUT_TYPE } = process.env
  const optimized = await optimize(svg, names)
    .then(removeSVGElement)
    .then(svg => {
      // taro不支持驼峰
      if (OUTPUT_TYPE !== 'taro') {
        return svg.replace(
          /([a-z]+)-([a-z]+)=/g,
          (_, a, b) => `${a}${camelCase(b)}=`,
        )
      }
      return svg
    })
    .then(svg => {
      // 处理two-tone图标
      return handleTwoTone(svg, names)
    })

  return optimized
}

export default processSvg
