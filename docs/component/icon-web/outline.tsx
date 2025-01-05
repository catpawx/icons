import { EyeOutlined } from '@catpawx/icons-react'
import React from 'react'

import Code from '../icon/code'

const icons: { name: string; Component: any }[] = [
  { name: 'EyeOutlined', Component: EyeOutlined },
]

const Outline: React.FC = () => {
  return <Code icons={icons} currentColor />
}

export default Outline
