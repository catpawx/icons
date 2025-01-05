/* eslint-disable @typescript-eslint/ban-ts-comment */
import fs from 'fs'
import path from 'path'

// @ts-ignore
// import format from 'prettier-eslint'
import iconsData from '../.icons/data.json'
import processSvg from './process-svg'
import { getAttrs, getElementCode } from './template'
import { parseName } from './utils'

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

const icons: { [key: string]: Icon } = iconsData
const defaultStyle = process.env.npm_package_config_style || 'stroke'

const rootDir = path.resolve()

// where icons code in
const srcDir = path.join(rootDir, '.icons')
const iconsDir = path.join(rootDir, '.icons/icons')

// generate icons.js and icons.d.ts file
const generateIconsIndex = () => {
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir)
    fs.mkdirSync(iconsDir)
  } else if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir)
  }

  const initialTypeDefinitions = `/// <reference types="react" />
  import { ComponentType, SVGAttributes } from 'react';

  interface Props extends SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
  }

  type Icon = ComponentType<Props>;
  `

  fs.writeFileSync(path.join(rootDir, '.icons', 'icons.js'), '', 'utf-8')
  fs.writeFileSync(
    path.join(rootDir, '.icons', 'icons.d.ts'),
    initialTypeDefinitions,
    'utf-8',
  )
}

// generate attributes code
const attrsToString = (attrs: { [key: string]: string }, style: string) => {
  console.log('style: ', style)
  return Object.keys(attrs)
    .map((key: any) => {
      // should distinguish fill or stroke
      if (key === 'width' || key === 'height' || key === style) {
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
  const destination = path.join(rootDir, '.icons/icons', `${names.name}.js`)
  const code: any = fs.readFileSync(location)
  const svgCode = await processSvg(code)
  const ComponentName = names.componentName
  const element = getElementCode(
    ComponentName,
    attrsToString(getAttrs(names.style), names.style),
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

// append export code to icons.js
const appendToIconsIndex = ({
  ComponentName,
  name,
}: {
  ComponentName: string
  name: string
}) => {
  const exportString = `export { default as ${ComponentName} } from './icons/${name}';\r\n`
  fs.appendFileSync(
    path.join(rootDir, '.icons', 'icons.js'),
    exportString,
    'utf-8',
  )

  const exportTypeString = `export const ${ComponentName}: Icon;\n`
  fs.appendFileSync(
    path.join(rootDir, '.icons', 'icons.d.ts'),
    exportTypeString,
    'utf-8',
  )
}

export const generateIcons = () => {
  generateIconsIndex()

  Object.keys(icons)
    .map(key => icons[key])
    .forEach(({ name }) => {
      generateIconCode({ name }).then(({ ComponentName, name }) => {
        appendToIconsIndex({ ComponentName, name })
      })
    })
}
