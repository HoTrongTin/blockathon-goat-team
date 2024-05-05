import { Box } from '@0xsequence/design-system'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Button, Flex, Image, Modal, Typography } from 'antd'
import axios from 'axios'
import { get } from 'lodash'
import { useAddressSignature } from '~/hooks/useAddressSignature'
import { useReadNFTContract } from '~/hooks/useReadContract'

import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'react-use'
import { MeOnChainServiceInstance } from '~/constants/instance'
import logoUrl from '~/images/logo.png'
import truncateEthAddress from '~/utils/truncateAddress'
import { DonateOrClaim } from './DonateButton'
import { Carousel } from 'antd'
import { useAccount } from 'wagmi'

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
}

const { Title, Paragraph } = Typography

const DetailBtn = ({ tokenId }) => {
  const navigate = useNavigate()
  return (
    <Button
      icon={<InfoCircleOutlined />}
      onClick={() => {
        navigate('/post/' + tokenId)
      }}
    >
      {' '}
      Details{' '}
    </Button>
  )
}

const ImgCarousal = ({ items, isDetails }: { items: string[]; isDetails: boolean }) => {
  return (
    <>
      <Carousel autoplay={isDetails} dotPosition="left" infinite={false}>
        {items.map(src => (
          <div>
            <Image src={src} width={420} sizes="" height={420} preview={false} />
          </div>
        ))}
      </Carousel>
    </>
  )
}

const PublicPostData = ({ tokenId, tokenURI }) => {
  console.log('🚀 ~ PublicPostData ~ tokenId:', tokenId)
  // const { address } = useAccount()
  const location = useLocation()
  const address: string = get(location, ['search']).split('=').at(-1) // || get(location, ['state', 'address'], '')
  console.log('🚀 ~ PublicPostData ~ address:', address)
  const isDetails = location.pathname.includes('post/' + tokenId)
  const navigate = useNavigate()

  const { data: _ownerOf } = useReadNFTContract('ownerOf', [tokenId])

  const { data: signature } = useAddressSignature()
  const tokenUri = String(tokenURI)
  const author = String(_ownerOf)

  const { data: postData } = useQuery({
    queryKey: [tokenUri, 'query-tokenUri', address, author],
    queryFn: async () => {
      if (
        !tokenUri ||
        !tokenUri.includes(import.meta.env.VITE_BE_LINK) ||
        (!!address && address.toLowerCase() !== author.toLowerCase())
      )
        return null

      const { data } = await axios.get(tokenUri, {
        headers: {
          onchainsignature: signature
        }
      })
      return data
    }
  })

  const { refetch: refetchViewData } = useQuery({
    queryKey: [get(postData, 'post.id'), 'view-post'],
    queryFn: async () => {
      if (!get(postData, 'post.id')) return null
      const { data } = await MeOnChainServiceInstance.post(`/post/${get(postData, 'post.id')}/view`, null, {
        headers: {
          onchainsignature: signature
        }
      })
      return data
    },
    enabled: false
  })

  useDebounce(
    () => {
      console.log('🚀 ~ refetch ~ data')
      refetchViewData().then(data => {
        // console.log('🚀 ~ refetch ~ data:', data)
      })
    },
    10 * 1000,
    [refetchViewData]
  )

  return (
    postData && (
      <Flex style={{ border: !isDetails && '1px solid #333', padding: 8, flexDirection: 'column' }}>
        <Flex style={{ justifyContent: 'left', alignItems: 'center', gap: 8, marginBottom: 12 }}>
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
        <Flex style={{ gap: 8, flex: 1 }}>
          <Flex style={{ width: 428 }}>
            <ImgCarousal isDetails={isDetails} items={get(postData, ['images'], [logoUrl])} />
            {/* <Image src={get(postData, ['images', 0], logoUrl)} width={420} preview={false} /> */}
          </Flex>
          <Flex style={{ flex: 'auto', flexDirection: 'column' }}>
            <Title style={{ textAlign: 'center' }}> {get(postData, 'post.name')} </Title>
            <Flex>
              <Box style={{ flex: 1 }}>
                <Paragraph
                  style={{ textAlign: 'left' }}
                  ellipsis={
                    !isDetails && {
                      rows: 10,
                      expandable: 'collapsible',
                      onExpand: () => {
                        navigate('/post/' + tokenId)
                      }
                    }
                  }
                >
                  {get(postData, 'post.description')}
                </Paragraph>
              </Box>
            </Flex>
            <Flex style={{ marginTop: 'auto', justifyContent: 'space-evenly' }}>
              {!isDetails && <DetailBtn tokenId={tokenId} />}
              {/* <Button icon={<LikeFilled />}> Like </Button> */}
              <DonateOrClaim postId={get(postData, 'post.id')} author={author} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    )
  )
}

export const Posts = ({ tokenId }) => {
  const { data: _tokenMetadata } = useReadNFTContract('_tokenMetadata', [tokenId])

  return get(_tokenMetadata, '1') && <PublicPostData tokenId={tokenId} tokenURI={get(_tokenMetadata, '0')} />
}
