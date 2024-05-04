import { Layout, theme } from 'antd'
import React from 'react'

import { HomeContent } from './HomeContent'
import { PageHeader } from '~/components/Headers/PageHeader'

const { Header, Footer, Sider, Content } = Layout

export const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#000'
}

const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout>
      <PageHeader />
      <HomeContent />
      <Footer style={footerStyle}>MeOnChain ©{new Date().getFullYear()} Created by GOAT Team</Footer>
    </Layout>
  )
}

export default HomePage
