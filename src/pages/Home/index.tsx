import React from 'react'
import { useConnect } from 'wagmi'

const HomePage = () => {
  const { connect, connectors, isPending } = useConnect()
  return <div>HomePage</div>
}

export default HomePage
