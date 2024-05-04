import { Box } from '@0xsequence/design-system'
import { LogoutOutlined } from '@ant-design/icons'
import { Button, Flex, theme } from 'antd'
import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import truncateEthAddress from '~/utils/truncateAddress'

const allCenterStyled: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
const textWhiteStyled: React.CSSProperties = {
  color: '#fafafa'
}

const ButtonConnect: React.ElementType = ({ style }) => {
  const { connect, connectors, isPending } = useConnect()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const {
    token: {}
  } = theme.useToken()

  const handleConnect = React.useCallback(() => {
    try {
      console.log('🚀 ~ handleConnect ~ connectors:', connectors)
      connect({ connector: connectors[0] })
    } catch (e) {
      console.error('error connecting', e)
    }
  }, [connect])

  return isConnected ? (
    <Flex style={{ ...allCenterStyled, ...style }}>
      <Box style={{ margin: 8 }}>
        <Box style={textWhiteStyled}>{truncateEthAddress(address)}</Box>
        <Box style={textWhiteStyled}> Balance: {truncateEthAddress(address)}</Box>
      </Box>

      <Button
        type="primary"
        style={{ marginLeft: 8, borderRadius: '9999px', backgroundColor: 'transparent' }}
        onClick={() => disconnect()}
        icon={<LogoutOutlined />}
      ></Button>
    </Flex>
  ) : (
    <Button style={style} onClick={handleConnect}>
      {isPending ? 'Connecting' : 'Connect'}
    </Button>
  )
}

export default ButtonConnect
