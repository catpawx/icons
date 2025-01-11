---
title: 快速上手
order: 1
nav:
  title: 指南
group:
  title: 开发指南
  path: /guide
---

> 通过本章节你可以了解到图标库的安装方法和基本使用姿势，以 `@catpawx/icons-react` 为例。

## 安装

### 通过 npm 安装

在现有项目中使用图标库时，可以通过 npm 或 yarn 进行安装

```bash
## npm
npm i @catpawx/icons-react

## yarn
yarn add @catpawx/icons-react

## @catpawx/icons-react-icon 还需要额外安装 react-native-svg
```

## 引入组件

### 自动按需引入组件 (推荐)

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。

```bash
# 安装插件
yarn add babel-plugin-import --dev
```

在 babel.config.js 中添加配置

```json
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "@catpawx/icons-react",
        "libraryDirectory": "dist"
      }
    ]
  ]
}
```

### 使用组件

```tsx | pure
import React from 'react'
import { SuccessOutline } from '@catpawx/icons-react'

const App: React.FC = () => {
  // @catpawx/icons-react 的组件则是 <ArrowRightOutlined color="#1677ff" size={20} />
  return (
    <span style={{ color: '#1677ff', fontSize: 20 }}>
      <ArrowRightOutlined />
    </span>
  )
}
```

## 常见问题

待收集。
