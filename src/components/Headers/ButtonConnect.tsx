import { Box } from '@0xsequence/design-system'
import { LogoutOutlined } from '@ant-design/icons'
import { Button, Flex, theme } from 'antd'
import React from 'react'
import { Address, formatEther } from 'viem'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useSignConnect } from '~/hooks/useSignConnect'
import useTokenContract from '~/hooks/useTokenContract'
import truncateEthAddress from '~/utils/truncateAddress'
import numeral from 'numeral'
import { Typography } from 'antd'

const { Text } = Typography

function Balance() {
  const { data: balance } = useTokenContract()
  return (
    <Box style={{ ...textWhiteStyled }}>
      Balance:{' '}
      <Text style={{ ...textWhiteStyled, textTransform: 'uppercase' }}>
        {numeral(+formatEther((balance ?? 0) as bigint)).format('0.0a')}
      </Text>
    </Box>
  )
}

const allCenterStyled: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
const textWhiteStyled: React.CSSProperties = {
  color: '#fafafa'
}

const ButtonConnect: React.ElementType = ({ style }) => {
  const { connectAsync: connect, connectors, isPending } = useConnect()
  const { isConnected, address } = useAccount()
  const { disconnectAsync: disconnect } = useDisconnect()
  const { signMessage } = useSignConnect()

  const handleConnect = React.useCallback(() => {
    try {
      connect({ connector: connectors[0] }).then(async data => {
        const address: string = data.accounts[0]
        await signMessage(address)
      })
    } catch (e) {
      console.error('error connecting', e)
    }
  }, [connect])

  return isConnected ? (
    <Flex style={{ ...allCenterStyled, ...style }}>
      <Box style={{ margin: 8 }}>
        <Box style={textWhiteStyled}>{truncateEthAddress(address)}</Box>
        <Balance />
      </Box>

      <Button
        type="primary"
        style={{ marginLeft: 8, borderRadius: '9999px', backgroundColor: 'transparent' }}
        onClick={() =>
          disconnect().then(() => {
            localStorage.clear()
          })
        }
        icon={<LogoutOutlined />}
      ></Button>
    </Flex>
  ) : (
    <Button style={{ borderRadius: 8, minWidth: 100, ...style }} onClick={handleConnect}>
      {isPending ? 'Connecting' : 'Connect'}
    </Button>
  )
}

export default ButtonConnect
