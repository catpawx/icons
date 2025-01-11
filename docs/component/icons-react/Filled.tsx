import * as ICONS from '@catpawx/icons-react'
import React from 'react'

import Code from '../icon/code'

const icons: { name: string; Component: any }[] = Object.keys(ICONS)
  .filter((iconName: any) => iconName.indexOf('Filled') !== -1)
  .map((iconName: any) => {
    return { name: iconName, Component: ICONS[iconName as keyof typeof ICONS] }
  })

const Filled: React.FC = () => {
  return <Code icons={icons} />
}

export default Filled
