import { Image } from '@0xsequence/design-system'
import { Layout } from 'antd'
import logoUrl from '~/images/logo.png'
import { headerStyle } from '~/styled/layout'
import ButtonConnect from './ButtonConnect'
import { useAddressSignature } from '../../hooks/useAddressSignature'

const { Header } = Layout

export function PageHeader() {
  return (
    <Header style={headerStyle}>
      <Image style={{ borderRadius: '100%' }} height="10" alt="logo" src={logoUrl} />
      <ButtonConnect style={{ marginLeft: 'auto' }} />
    </Header>
  )
}
