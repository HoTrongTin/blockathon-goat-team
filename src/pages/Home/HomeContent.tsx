import { Layout, theme } from 'antd'
import { contentStyle } from '~/styled/layout'
import { Posts } from './content/Posts'
import CreatePostModal from '~/components/modals/CreatePostModal'

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
          maxWidth: 846,
          display: 'grid',
          gap: 16,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          flex: 'auto'
        }}
      >
        <CreatePostModal/>
        {[1, 2, 3, 4, 5, 6].map(post => (
          <Posts key={'post' + post} />
        ))}
      </div>
    </Content>
  )
}
