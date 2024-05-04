import { Box } from '@0xsequence/design-system'
import { Avatar, Button, Flex, Image, Typography } from 'antd'
import axios from 'axios'
import { get } from 'lodash'
import { useQuery } from '@tanstack/react-query'
import { useAddressSignature } from '~/hooks/useAddressSignature'
import { INewPost } from '~/hooks/useCreatePost'
import { useReadNFTContract } from '~/hooks/useReadContract'

import logoUrl from '~/images/logo.png'
import { LikeFilled, UserOutlined } from '@ant-design/icons'
import { DonateButton } from './DonateButton'
import truncateEthAddress from '~/utils/truncateAddress'

const { Title, Paragraph } = Typography

const PublicPostData = ({ tokenId }) => {
  const { data: tokenURI } = useReadNFTContract('tokenURI', [tokenId])
  const { data: _ownerOf } = useReadNFTContract('ownerOf', [tokenId])

  const { data: signature } = useAddressSignature()
  const tokenUri = String(tokenURI)
  const author = String(_ownerOf)

  const { data } = useQuery({
    queryKey: [tokenUri, 'query-token'],
    queryFn: async () => {
      if (!tokenUri || !tokenUri.includes(import.meta.env.VITE_BE_LINK)) return null

      const { data } = await axios.get(tokenUri ?? 'https://rpws4vt0-3000.asse.devtunnels.ms/post/29', {
        headers: {
          onchainsignature: signature
        }
      })
      return data as INewPost
    }
  })

  return (
    data && (
      <div style={{ border: '1px solid #333', padding: 8 }}>
        <Flex style={{ justifyContent: 'left', alignItems: 'center', gap: 8 }}>
          <Avatar size={36} icon={<UserOutlined />} />
          <Paragraph
            style={{
              marginBottom: 0
            }}
            copyable={{
              text: async () =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve(author)
                  }, 200)
                })
            }}
          >
            {truncateEthAddress(author)}
          </Paragraph>
        </Flex>
        <Flex style={{ gap: 8 }}>
          <Box>
            <Image src={get(data, ['images', 0], logoUrl)} width={420} />
          </Box>
          <Flex style={{ flex: 'auto', flexDirection: 'column' }}>
            <Title style={{ textAlign: 'center' }}> {get(data, 'post.name')} </Title>
            <Flex>
              <Box style={{ flex: 1 }}>
                <Paragraph
                  style={{ textAlign: 'left' }}
                  ellipsis={{
                    rows: 10,
                    expandable: 'collapsible',
                    onExpand: () => {}
                  }}
                >
                  {get(data, 'post.description')}
                </Paragraph>
              </Box>
            </Flex>
            <Flex style={{ marginTop: 'auto', justifyContent: 'space-between' }}>
              <Button icon={<LikeFilled />}> Like </Button>
              <Button icon={<LikeFilled />}> Like </Button>
              <DonateButton author={author} />
            </Flex>
          </Flex>
        </Flex>
      </div>
    )
  )
}

export const Posts = ({ tokenId }) => {
  const { data: isPublicToken } = useReadNFTContract('isPublicToken', [tokenId])

  return isPublicToken && <PublicPostData tokenId={tokenId} />
}
