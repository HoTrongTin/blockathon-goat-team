import { Layout, theme } from 'antd'
import { contentStyle } from '~/styled/layout'
import { Posts } from './content/Posts'
import CreatePostModal from '~/components/modals/CreatePostModal'
import { useReadNFTContract } from '~/hooks/useReadContract'
import React from 'react'

const { Content } = Layout

export const HomeContent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const { data: _totalSupply } = useReadNFTContract('_totalSupply', [])
  console.log('🚀 ~ HomeContent ~ _totalSupply:', Number(_totalSupply))

  const allPosts = React.useMemo(() => {
    const elements = []
    const num = Number(_totalSupply ?? 0)
    for (let idx = num; idx > 0; idx--) {
      elements.push(<Posts key={'post' + idx} tokenId={idx} />)
    }
    return elements
  }, [_totalSupply])

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
        <CreatePostModal />
        {allPosts}
      </div>
    </Content>
  )
}
