#!/usr/bin/env node

// import dotenv from 'dotenv'
// import minimist from 'minimist'
// import colors from 'picocolors'

// import { fetchSvg } from './fetch-svg'
// import { generateIcons } from './generate-icons'
// const { red, yellow, magenta } = colors

// const argv = minimist<{
//   template?: string
//   help?: boolean
// }>(process.argv.slice(2), {
//   default: { help: false },
//   alias: { h: 'help', t: 'template' },
//   string: ['_'],
// })

// prettier-ignore
// const helpMessage = `\
// Usage: cpx-icons [OPTION]... [DIRECTORY]

// 创建一个新的JavaScript或TypeScript项目.
// 无参数时，以交互模式启动CLI.

// 选项:
//   -t, --template NAME        使用特定的模板

// 可用模板:
// ${yellow    ('react     react '  )}
// ${magenta    ('react-native      react-native '  )}
// ${red    ('taro      taro '  )}
// `

/** 程序入口 */
async function init() {
  console.log('🚀🚀🚀======>>>argv', 111)
  // const help = argv.help
  // if (help) {
  //   console.log(helpMessage)
  // }

  // 加载环境变量
  // dotenv.config()
  // // 1. 下载 svg 文件
  // await fetchSvg()
  // // 2. 生成 icon
  // generateIcons()
}

init().catch(e => {
  console.error(e)
})
