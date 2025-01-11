import * as ICONS from '@catpawx/icons-taro'
import React from 'react'

import Code from '../icon/code'

const icons: { name: string; Component: any }[] = Object.keys(ICONS)
  .filter((iconName: any) => iconName.indexOf('MultiTone') !== -1)
  .map((iconName: any) => {
    return { name: iconName, Component: ICONS[iconName as keyof typeof ICONS] }
  })

const MultiTone: React.FC = () => {
  return <Code icons={icons} />
}

export default MultiTone
