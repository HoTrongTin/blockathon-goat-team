import { Box } from '@0xsequence/design-system'
import { LogoutOutlined } from '@ant-design/icons'
import { Button, Flex, theme } from 'antd'
import React from 'react'
import { Address, formatEther } from 'viem'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useSignConnect } from '~/hooks/useSignConnect'
import { useReadTokenContract } from '~/hooks/useReadContract'
import truncateEthAddress from '~/utils/truncateAddress'
import numeral from 'numeral'
import { Typography } from 'antd'

const { Text, Paragraph } = Typography

function Balance() {
  const { address } = useAccount()
  const { data: balance } = useReadTokenContract('balanceOf', [address])
  return (
    <Box style={{ ...textWhiteStyled }}>
      Balance:{' '}
      <Text style={{ ...textWhiteStyled, textTransform: 'uppercase' }}>
        {numeral(+formatEther((balance ?? 0) as bigint)).format('0.0000a')} $GOAT
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

  const handleConnect = React.useCallback(async () => {
    try {
      await connect({ connector: connectors[0] }).then(async data => {
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
        <Box style={{ ...textWhiteStyled }}></Box>
        <Paragraph
          style={{
            ...textWhiteStyled,
            marginBottom: 0
          }}
          copyable={{
            text: async () =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve(address)
                }, 200)
              })
          }}
        >
          {truncateEthAddress(address)}
        </Paragraph>
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
