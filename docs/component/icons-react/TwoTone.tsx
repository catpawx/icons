import * as ICONS from '@catpawx/icons-react'
import React from 'react'

import Code from '../icon/code'

const icons: { name: string; Component: any }[] = Object.keys(ICONS)
  .filter((iconName: any) => iconName.indexOf('TwoTone') !== -1)
  .map((iconName: any) => {
    return { name: iconName, Component: ICONS[iconName as keyof typeof ICONS] }
  })

const TwoTone: React.FC = () => {
  return <Code icons={icons} />
}

export default TwoTone
