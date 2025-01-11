import { Col, Empty, message, Row } from 'antd'
import copy from 'copy-to-clipboard'
import React, { memo } from 'react'

import STYLES from './style.module.less'

interface Icon {
  name: string
  Component: React.FC<{
    color?: string
    colors?: string[]
    size?: string | number
  }>
}

interface CodeProps {
  icons: Icon[]
  currentColor?: string
  currentColors?: string[]
}

const Code: React.FC<CodeProps> = ({ icons, currentColor, currentColors }) => {
  const genOnClick = (c: string) => () => {
    const code = `<${c} />`

    copy(code)

    message.success(
      <>
        <code className={STYLES.code}>{code}</code> copied 🎉
      </>,
    )
  }

  if (icons.length === 0) {
    return <Empty />
  }

  return (
    <Row>
      {icons.map(icon => {
        return (
          <Col
            key={icon.name}
            span={4}
            className={STYLES.item}
            onClick={genOnClick(icon.name)}>
            <span className={STYLES.icon}>
              <icon.Component
                color={currentColor}
                colors={currentColors}
                size={36}
              />
            </span>
            <p>{icon.name}</p>
          </Col>
        )
      })}
    </Row>
  )
}

export default memo(Code)
