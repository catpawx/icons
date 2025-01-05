// rollup.config.js 配置文件
const resolve = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const dts = require('rollup-plugin-dts').default

module.exports = [
  {
    input: ['./packages/icons-bin/src/index.ts'],
    output: {
      file: './packages/icons-bin/dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        // declarationDir: `./packages/${path}/dist/types`,
      }),
      resolve(),
      commonjs(),
      json(),
    ],
  },
  {
    input: './packages/icons-bin/src/index.ts',
    output: [{ file: './packages/icons-bin/dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
]
