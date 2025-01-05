/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as cheerio from 'cheerio'
// @ts-ignore
import { optimize as svgoOptimize } from 'svgo'

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
function optimize(svg: string): Promise<string> {
  const result = svgoOptimize(svg, {
    plugins: [
      // { convertShapeToPath: false },
      // { mergePaths: false },
      // { removeAttrs: { attrs: '(fill|stroke.*)' } },
      // { removeTitle: true },
    ],
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
 * Process SVG string.
 * @param {string} svg - An SVG string.
 * @param {Promise<string>}
 */
async function processSvg(svg: string): Promise<string> {
  const optimized = await optimize(svg)
    // remove semicolon inserted by prettier
    // because prettier thinks it's formatting JSX not HTML
    .then(svg => svg.replace(/;/g, ''))
    .then(removeSVGElement)
    .then(svg =>
      svg.replace(/([a-z]+)-([a-z]+)=/g, (_, a, b) => `${a}${CamelCase(b)}=`),
    )
  return optimized
}

export default processSvg
