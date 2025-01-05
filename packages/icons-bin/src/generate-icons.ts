/* eslint-disable @typescript-eslint/ban-ts-comment */
import fs from 'fs'
import path from 'path'

// @ts-ignore
// import format from 'prettier-eslint'
// import iconsData from '../.icons/data.json'
import { defaultStyle } from './config'
import processSvg from './process-svg'
import { getAttrs, getElementCode, getStyles, getTypes } from './template'
import { copy, parseName } from './utils'

interface Icon {
  name: string
  id: string
  key: string
  file: string
  description: string
  width: number
  height: number
  image: string
}

const rootDir = path.resolve()

// where icons code in
const srcDir = path.join(rootDir, '.icons')
const iconsDir = path.join(rootDir, '.icons/icons')
const iconsIndexFile = path.join(rootDir, '.icons', 'index.ts')
const iconsJsonFile = path.join(rootDir, '.icons/data.json')

// generate icons.js and icons.d.ts file
const generateIconsIndex = () => {
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir)
    fs.mkdirSync(iconsDir)
  } else if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir)
  }

  fs.writeFileSync(iconsIndexFile, '', 'utf-8')
}

// generate attributes code
const attrsToString = (attrs: { [key: string]: string }) => {
  return Object.keys(attrs)
    .map((key: any) => {
      // should distinguish fill or stroke
      if (
        key === 'width' ||
        key === 'height' ||
        key === 'fill' ||
        key === 'stroke'
      ) {
        return key + '={' + attrs[key] + '}'
      }
      if (key === 'otherProps') {
        return '{...otherProps}'
      }
      return key + '="' + attrs[key] + '"'
    })
    .join(' ')
}

// generate icon code separately
const generateIconCode = async ({ name }: { name: any }) => {
  const names = parseName(name, defaultStyle)
  console.log(names)
  const location = path.join(rootDir, '.icons/svg', `${names.name}.svg`)
  const destination = path.join(rootDir, '.icons/icons', `${names.name}.tsx`)
  const code: any = fs.readFileSync(location)
  const svgCode = await processSvg(code, names)
  const ComponentName = names.componentName
  const element = getElementCode(
    ComponentName,
    attrsToString(getAttrs(names)),
    svgCode,
  )
  // const component = format({
  //   text: element,
  //   eslintConfig: {
  //     extends: 'airbnb',
  //   },
  //   prettierOptions: {
  //     bracketSpacing: true,
  //     singleQuote: true,
  //     parser: 'flow',
  //   },
  // })
  const component = element

  fs.writeFileSync(destination, component, 'utf-8')

  console.log('Successfully built', ComponentName)
  return { ComponentName, name: names.name }
}

// append export code to index.ts
const appendToIconsIndex = ({
  ComponentName,
  name,
}: {
  ComponentName: string
  name: string
}) => {
  const exportString = `export { default as ${ComponentName} } from './icons/${name}';\r\n`
  fs.appendFileSync(iconsIndexFile, exportString, 'utf-8')
}

/** 生成图标 */
export const generateIcons = () => {
  const icons: { [key: string]: Icon } = loadLocalJson()
  generateIconsIndex()

  // Object.keys(icons)
  // .map(key => icons[key])
  // .forEach(({ name }) => {
  //   generateIconCode({ name }).then(({ ComponentName, name }) => {
  //     appendToIconsIndex({ ComponentName, name })
  //   })
  // })

  const tasks = Object.keys(icons)
    .map(key => icons[key])
    .map(({ name }) => {
      return generateIconCode({ name }).then(({ ComponentName, name }) => {
        return appendToIconsIndex({ ComponentName, name })
      })
    })

  Promise.all(tasks).then(() => {
    copyIconsToOutput()
  })
  // 将上面的异步任务执行后，将 icons 复制到指定目录
}

/** 加载本地的json数据 */
export const loadLocalJson = () => {
  return JSON.parse(fs.readFileSync(iconsJsonFile, 'utf-8'))
}

/** 将资源复制到指定目录 */
export const copyIconsToOutput = () => {
  const { OUTPUT_DIR } = process.env
  // 将 styles.ts 和types.ts 复制到 .icons 目录下
  const outputDir = path.join(rootDir, OUTPUT_DIR || '')
  const outputiconsIndexFile = path.join(outputDir, 'index.ts')
  const outputStylesFile = path.join(outputDir, 'styles.ts')
  const outputTypesFile = path.join(outputDir, 'types.ts')
  copy(iconsDir, path.join(outputDir, 'icons'))
  copy(iconsIndexFile, outputiconsIndexFile)
  fs.writeFileSync(outputStylesFile, getStyles(), 'utf-8')
  fs.writeFileSync(outputTypesFile, getTypes(), 'utf-8')
  // 删除 .icons 目录
  fs.rmSync(srcDir, { recursive: true })
}
