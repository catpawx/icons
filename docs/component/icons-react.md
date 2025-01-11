---
title: react 图标
order: 1
nav:
  title: 组件
---

# react 图标

语义化的矢量图形。

[icons-react-npm-url]: https://www.npmjs.com/package/@catpawx/icons-react

[![](https://img.shields.io/npm/v/@catpawx/icons-react.svg)][icons-react-npm-url]
[![](https://img.shields.io/npm/dm/@catpawx/icons-react.svg)][icons-react-npm-url]
[![](https://img.shields.io/badge/language-typescript-blue.svg)](https://www.typescriptlang.org/)
[![install size](https://packagephobia.com/badge?p=@catpawx/icons-react)](https://packagephobia.com/result?p=@catpawx/icons-react)

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { RightOutlined, RightCircleTwoTone } from '@catpawx/icons-react'

export default () => {
  return (
    <>
      <RightOutlined />
      <RightOutlined color="red" size={30} />
      <RightOutlined style={{ color: '#1677ff', fontSize: 40 }} />
      <span style={{ color: '#1677ff', fontSize: 40 }}>
        <RightOutlined
          onClick={() => {
            console.log('onClick')
          }}
        />
      </span>
      <RightCircleTwoTone colors={['#722ed1', '#efdbff']} size={40} />
    </>
  )
}
```

## 线框风格

<code compact inline src="./icons-react/Outlined.tsx"></code>

## 实底风格

<code compact inline src="./icons-react/Filled.tsx"></code>

## 双色风格

<code compact inline src="./icons-react/TwoTone.tsx"></code>

## 多彩风格

<code compact inline src="./icons-react/MultiTone.tsx"></code>
