import React from 'react'
import { useSignConnect } from './hooks/useSignConnect'

const GlobalService: React.FC<{children?: React.ReactNode}> = (props) => {
  return <>{props?.children}</>
}

export default GlobalService
