/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as Figma from 'figma-js'
import { ensureDir, writeFile } from 'fs-extra'
import got from 'got'
// @ts-ignore
import PQueue from 'p-queue'
import { join, resolve } from 'path'

import { PATH_LIST } from './config'

export async function fetchSvg() {
  const { FIGMA_TOKEN, FIGMA_FILE_URL } = process.env

  const options: any = {
    outputDir: './.icons/',
    format: 'svg',
    scale: '1',
  }

  for (const arg of process.argv.slice(2)) {
    const [param, value] = arg.split('=')
    if (options[param]) {
      options[param] = value
    }
  }

  if (!FIGMA_TOKEN) {
    throw Error('Cannot find FIGMA_TOKEN in process!')
  }

  const client = Figma.Client({
    personalAccessToken: FIGMA_TOKEN,
  })

  if (!FIGMA_FILE_URL) {
    throw Error('Cannot find FIGMA_FILE_URL key in process!')
  }

  const match = FIGMA_FILE_URL.match(/(file|design)\/([a-z0-9]+)\//i)
  if (!match) {
    throw new Error('Invalid FIGMA_FILE_URL format')
  }
  const fileId = match[2]

  console.log(`Exporting ${FIGMA_FILE_URL} components`)
  return await client
    .file(fileId)
    .then(({ data }) => {
      console.log('Processing response')
      const components: any = {}

      function check(c: any) {
        if (c.type === 'COMPONENT') {
          const { name, id } = c
          const { description = '', key } = data.components[c.id]
          const { width, height } = c.absoluteBoundingBox

          components[id] = {
            name,
            id,
            key,
            file: fileId,
            description,
            width,
            height,
          }
        } else if (c.children) {
          c.children.forEach(check)
        }
      }

      // 根据path路径查找
      function pathFilter(c: any, pathName?: string) {
        if (pathName === undefined) {
          check(c)
        } else {
          if (c.name.includes(pathName)) {
            const pName = PATH_LIST.shift()
            c.children.forEach((c: any) => {
              pathFilter(c, pName)
            })
          }
        }
      }

      const pathName = PATH_LIST?.shift()
      // data.document.children根据path路径，路径长度不定查找
      data.document.children.forEach(c => {
        pathFilter(c, pathName)
      })

      if (Object.values(components).length === 0) {
        throw Error('No components found!')
      }
      console.log(
        `${Object.values(components).length} components found in the figma file`,
      )
      return components
    })
    .then(components => {
      console.log('Getting export urls')
      return client
        .fileImages(fileId, {
          format: options.format,
          ids: Object.keys(components),
          scale: options.scale,
        })
        .then(({ data }) => {
          for (const id of Object.keys(data.images)) {
            components[id].image = data.images[id]
          }
          return components
        })
    })
    .then(components => {
      return ensureDir(join(options.outputDir))
        .then(() =>
          writeFile(
            resolve(options.outputDir, 'data.json'),
            JSON.stringify(components),
            'utf8',
          ),
        )
        .then(() => components)
    })
    .then(components => {
      const contentTypes: any = {
        svg: 'image/svg+xml',
        png: 'image/png',
        jpg: 'image/jpeg',
      }
      return queueTasks(
        Object.values(components).map((component: any) => () => {
          return got
            .get(component.image, {
              headers: {
                'Content-Type': contentTypes[options.format],
              },
              encoding: options.format === 'svg' ? 'utf8' : undefined,
            })
            .then(response => {
              return ensureDir(join(options.outputDir, options.format)).then(
                () =>
                  writeFile(
                    join(
                      options.outputDir,
                      options.format,
                      `${component.name}.${options.format}`,
                    ),
                    response.body,
                    options.format === 'svg' ? 'utf8' : 'binary',
                  ),
              )
            })
        }),
      )
    })
    .catch(error => {
      throw Error(`Error fetching components from Figma: ${error}`)
    })
}

function queueTasks(tasks: any) {
  const queue = new PQueue(Object.assign({ concurrency: 3 }))
  for (const task of tasks) {
    queue.add(task)
  }
  queue.start()
  return queue.onIdle()
}
