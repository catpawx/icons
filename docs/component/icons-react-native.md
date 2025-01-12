---
title: react-native 图标
order: 2
nav:
  title: 组件
---

# react-native 图标

语义化的矢量图形。

[icons-react-native-npm-url]: https://www.npmjs.com/package/@catpawx/icons-react-native

[![](https://img.shields.io/npm/v/@catpawx/icons-react-native.svg)][icons-react-native-npm-url]
[![](https://img.shields.io/npm/dm/@catpawx/icons-react-native.svg)][icons-react-native-npm-url]
[![](https://img.shields.io/badge/language-typescript-blue.svg)](https://www.typescriptlang.org/)
[![install size](https://packagephobia.com/badge?p=@catpawx/icons-react-native)](https://packagephobia.com/result?p=@catpawx/icons-react-native)

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { View } from 'react-native'
import { RightOutlined, RightCircleTwoTone } from '@catpawx/icons-react-native'

export default () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <RightOutlined />
      <RightOutlined color="red" size={30} />
      <RightCircleTwoTone colors={['#722ed1', '#efdbff']} size={40} />
    </View>
  )
}
```

## 线框风格

<code compact inline src="./icons-react-native/Outlined.tsx"></code>

## 实底风格

<code compact inline src="./icons-react-native/Filled.tsx"></code>

## 双色风格

<code compact inline src="./icons-react-native/TwoTone.tsx"></code>

## 多彩风格

<code compact inline src="./icons-react-native/MultiTone.tsx"></code>
