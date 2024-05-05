import React from 'react'
import { Posts } from '../Home/content/Posts'
import { Flex, Layout } from 'antd'
import { PageHeader } from '~/components/Headers/PageHeader'
import { Footer, Content } from 'antd/es/layout/layout'
import { footerStyle } from '../Home'
import { useLocation, useParams } from 'react-router-dom'

export const PostDetail: React.FC = () => {
  const param = useParams()
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader />
      <Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Flex style={{ maxWidth: 1200 }}>
          <Posts tokenId={param?.id} />
        </Flex>
      </Content>
      <Footer style={footerStyle}>MeOnChain ©{new Date().getFullYear()} Created by GOAT Team</Footer>
    </Layout>
  )
}
