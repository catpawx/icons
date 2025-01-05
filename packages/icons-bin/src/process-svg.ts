/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as cheerio from 'cheerio'
// @ts-ignore
import { optimize as svgoOptimize } from 'svgo'

import { STYLESKEY } from './config'

/**
 * Convert string to CamelCase.
 * @param {string} str - A string.
 * @returns {string}
 */
function CamelCase(str: string): string {
  return str.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

/**
 * Optimize SVG with `svgo`.
 * @param {string} svg - An SVG string.
 * @returns {Promise<string>}
 */
function optimize(svg: string, names: any): Promise<string> {
  const { style } = names
  const plugins: any = [
    {
      name: 'removeXlink',
    },
  ]
  // fill填充、stroke描边才需要的插件
  if (style === STYLESKEY.OUTLINED) {
    plugins.concat([
      {
        name: 'preset-default',
        params: {
          overrides: {
            converShapeToPath: false,
            mergePaths: false,
          },
        },
      },
      {
        name: 'removeAttrs',
        params: {
          elemSeparator: ',',
          attrs: ['fill', 'stroke'],
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
 * remove SVG element.
 * @param {string} svg - An SVG string.
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
  if (names.style === STYLESKEY.TWOTONE) {
    // 储存color
    const colorMap = new Map()
    svg = svg.replace(/fill="(#[A-z0-9]{6})"/g, (_, a, b) => {
      // 判断colorMap中是否存在该颜色
      if (!colorMap.has(b)) {
        const size = colorMap.size
        colorMap.set(b, size)
        return `${a}={colors[${size}]}`
      } else {
        return `${a}={colors[${colorMap.get(b)}]}`
      }
    })
  }
  return svg
}

/**
 * Process SVG string.
 * @param {string} svg - An SVG string.
 * @param {Promise<string>}
 */
async function processSvg(svg: string, names: any) {
  const optimized = await optimize(svg, names)
    .then(removeSVGElement)
    .then(svg =>
      svg.replace(/([a-z]+)-([a-z]+)=/g, (_, a, b) => `${a}${CamelCase(b)}=`),
    )
    .then(svg => {
      // 处理two-tone图标
      return handleTwoTone(svg, names)
    })

  return optimized
}

export default processSvg
