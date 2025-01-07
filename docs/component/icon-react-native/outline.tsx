import { ArrowDownOutline } from '@catpawx/icons-react-native'
import React from 'react'

import Code from '../icon/code'

const icons: { name: string; Component: any }[] = [
  { name: 'ArrowDownOutline', Component: ArrowDownOutline },
]

const Outline: React.FC = () => {
  return <Code icons={icons} />
}

export default Outline
