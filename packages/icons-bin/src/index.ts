#!/usr/bin/env node

import dotenv from 'dotenv'
import minimist from 'minimist'
import colors from 'picocolors'
import prompts from 'prompts'

import { fetchSvg } from './fetch-svg'
import { generateIcons } from './generate-icons'
const { reset, red, yellow, magenta } = colors

const argv = minimist<{
  help?: boolean
}>(process.argv.slice(2), {
  default: { help: false },
  alias: { h: 'help' },
  string: ['_'],
})

// prettier-ignore
const helpMessage = `\
Usage: cpx-icons [OPTION]... [DIRECTORY]

创建一个新的JavaScript或TypeScript项目.
无参数时，以交互模式启动CLI.

选项:
  -t, --template NAME        使用特定的模板

可用模板:
${yellow    ('react     react '  )}
${magenta    ('react-native      react-native '  )}
${red    ('taro      taro '  )}
`

/** 程序入口 */
async function init() {
  const help = argv.help
  if (help) {
    console.log(helpMessage)
  }

  // 加载环境变量
  dotenv.config()
  let {
    FIGMA_FILE_URL,
    FIGMA_TOKEN,
    FIGMA_PATH_LIST,
    OUTPUT_DIR,
    OUTPUT_TYPE,
  } = process.env

  // 如果参数中有则覆盖
  if (argv.FIGMA_FILE_URL) {
    FIGMA_FILE_URL = argv.FIGMA_FILE_URL
  }

  if (argv.FIGMA_TOKEN) {
    FIGMA_TOKEN = argv.FIGMA_TOKEN
  }

  if (argv.FIGMA_PATH_LIST) {
    FIGMA_PATH_LIST = argv.FIGMA_PATH_LIST
  }

  if (argv.OUTPUT_DIR) {
    OUTPUT_DIR = argv.OUTPUT_DIR
  }

  if (argv.OUTPUT_TYPE) {
    OUTPUT_TYPE = argv.OUTPUT_TYPE
  }

  // 如果都没有，进入交互模式

  try {
    await prompts(
      [
        {
          type: FIGMA_FILE_URL ? null : 'text',
          name: 'FIGMA_FILE_URL',
          message: reset('请输入Figma文件链接:'),
          initial:
            'https://www.figma.com/design/CdrKL0WGCiYodTWWLP8aTE/icon?node-id=412-61&p=f&t=94mMcBpu9772S69f-0',
          onState: state => {
            FIGMA_FILE_URL = state.value
          },
        },
        {
          type: FIGMA_TOKEN ? null : 'text',
          name: 'FIGMA_TOKEN',
          message: reset('请输入Figma的token:'),
          initial: 'figd_KqQc668Uxxxxxxxxxx',
          onState: state => {
            FIGMA_TOKEN = state.value
          },
        },
        {
          type: FIGMA_PATH_LIST ? null : 'text',
          name: 'FIGMA_PATH_LIST',
          message: reset('请输入FIGMA_PATH_LIST:'),
          initial: 'icons-react',
          onState: state => {
            FIGMA_PATH_LIST = state.value
          },
        },
        {
          type: OUTPUT_DIR ? null : 'text',
          name: 'OUTPUT_DIR',
          message: reset('请输入OUTPUT_DIR:'),
          initial: 'icons',
          onState: state => {
            OUTPUT_DIR = state.value
          },
        },
        {
          type: OUTPUT_TYPE ? null : 'select',
          name: 'OUTPUT_TYPE',
          message: reset('请选择OUTPUT_TYPE:'),
          initial: 0,
          choices: [
            {
              title: 'react',
              value: 'react',
            },
            {
              title: 'react-native',
              value: 'react-native',
            },
            {
              title: 'taro',
              value: 'taro',
            },
          ],
          onState: state => {
            OUTPUT_TYPE = state.value
          },
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' 操作已取消')
        },
      },
    )
  } catch (cancelled: any) {
    console.log(cancelled.message)
  }

  // 设置环境变量
  process.env.FIGMA_FILE_URL = FIGMA_FILE_URL
  process.env.FIGMA_TOKEN = FIGMA_TOKEN
  process.env.FIGMA_PATH_LIST = FIGMA_PATH_LIST
  process.env.OUTPUT_DIR = OUTPUT_DIR
  process.env.OUTPUT_TYPE = OUTPUT_TYPE

  // 1. 下载 svg 文件
  await fetchSvg()
  // 2. 生成 icon
  generateIcons()
}

init().catch(e => {
  console.error(e)
})
