// rollup.config.js 配置文件
const resolve = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')
const fs = require('fs')
const path = require('path')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const dts = require('rollup-plugin-dts').default

const packagesDir = path.resolve(__dirname, 'packages')
const packageFiles = fs.readdirSync(packagesDir)

function output(path) {
  const output = []
  if (path.includes('bin')) {
    output.push({
      file: `./packages/${path}/dist/index.cjs`,
      format: 'cjs',
      sourcemap: true,
      banner: '#!/usr/bin/env node',
    })
  } else {
    output.push({
      dir: `./packages/${path}/dist`,
      format: 'es', // 指定输出格式为 ES Module
      sourcemap: true, // 生成 source maps
      preserveModules: true, // 保留模块结构
    })
  }
  return [
    {
      input: [`./packages/${path}/index.ts`],
      output,
      plugins: [
        typescript({
          tsconfig: './tsconfig.json',
        }),
        resolve(),
        commonjs(),
        json(),
      ],
      external: [
        'lodash',
        'react',
        'react-native',
        'react-native-svg',
        '@tarojs/components',
      ],
    },
    {
      input: `./packages/${path}/index.ts`,
      output: [{ file: `./packages/${path}/dist/index.d.ts`, format: 'esm' }],
      plugins: [dts()],
    },
  ]
}

module.exports = packageFiles.map(output).flat()
