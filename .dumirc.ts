import { defineConfig } from 'dumi'
import path from 'node:path'

const repo = process.env.PUBLIC_PATH || ''
const publicPath = repo ? `/${repo}` : '/'

export default defineConfig({
  favicons: ['https://avatars.githubusercontent.com/u/162661916'],
  base: `/${repo}`,
  publicPath,
  outputPath: 'docs-dist',
  resolve: {
    docDirs: ['docs'],
  },
  theme: {
    '@c-primary': '#0065FE',
    '@s-content-width': '1800px',
  },
  mfsu: false,
  alias: {
    'react-native$': 'react-native-web',
    'react-native-svg$': 'react-native-svg/src/ReactNativeSVG.web',
    '@tarojs/components': path.resolve(__dirname, './mock/taro.tsx'),
    '@catpawx/icons-react': path.resolve(__dirname, './packages/icons-react'),
    '@catpawx/icons-react-native': path.resolve(
      __dirname,
      './packages/icons-react-native/src',
    ),
    '@catpawx/icons-taro': path.resolve(__dirname, './packages/icons-taro/src'),
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es', // default: lib
        style: true,
      },
      'antd',
    ],
  ],
  themeConfig: {
    name: '图标库',
    logo: 'https://avatars.githubusercontent.com/u/162661916',
    footer: false,
    socialLinks: {
      github: 'https://github.com/24jieqi/icon',
    },
    nav: [
      {
        title: '指南',
        link: '/guide/quickstart',
      },
      {
        title: 'Icon',
        link: '/component/icon-app',
      },
    ],
  },
})
