import * as ICONS from '@catpawx/icons-react'
import React from 'react'

import Code from '../icon/code'

const icons: { name: string; Component: any }[] = Object.keys(ICONS)
  .filter((iconName: any) => iconName.indexOf('Outlined') !== -1)
  .map((iconName: any) => {
    return { name: iconName, Component: ICONS[iconName as keyof typeof ICONS] }
  })

const Outlined: React.FC = () => {
  return <Code icons={icons} />
}

export default Outlined
