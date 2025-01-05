import dotenv from 'dotenv'

import { fetchSvg } from './fetch-svg'
import { generateIcons } from './generate-icons'

async function init() {
  dotenv.config()
  // 1. 下载 svg 文件
  await fetchSvg()
  // 2. 生成 icon
  generateIcons()
}

init().catch(e => {
  console.error(e)
})
