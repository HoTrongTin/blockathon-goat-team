import { Layout, theme } from 'antd'
import { contentStyle } from '~/styled/layout'

const { Content } = Layout

export const HomeContent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Content style={contentStyle}>
      <div
        style={{
          padding: 24,
          minHeight: '100vh',
          background: colorBgContainer,
          borderRadius: borderRadiusLG
        }}
      >
        Content
      </div>
    </Content>
  )
}
