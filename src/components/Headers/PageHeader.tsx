import { Image } from '@0xsequence/design-system'
import { Button, Flex, Layout } from 'antd'
import logoUrl from '~/images/logo.png'
import { headerStyle } from '~/styled/layout'
import ButtonConnect from './ButtonConnect'
import { useAddressSignature } from '../../hooks/useAddressSignature'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'

const { Header } = Layout

export function PageHeader() {
  const navigate = useNavigate()
  const { address, isConnected } = useAccount()
  return (
    <Header style={headerStyle}>
      <Flex>
        <Image style={{ borderRadius: '100%' }} height="10" alt="logo" src={logoUrl} />
        <Button
          type="primary"
          onClick={() => {
            navigate('/')
          }}
          style={{ marginLeft: 16, borderRadius: '9999px', backgroundColor: 'transparent' }}
          icon={<HomeOutlined />}
        ></Button>
        {isConnected && (
          <Button
            type="primary"
            onClick={() => {
              navigate('/?user=' + address, {
                state: { address }
              })
            }}
            style={{ marginLeft: 16, borderRadius: '9999px', backgroundColor: 'transparent' }}
            icon={<UserOutlined />}
          ></Button>
        )}
      </Flex>
      <ButtonConnect style={{ marginLeft: 'auto' }} />
    </Header>
  )
}
