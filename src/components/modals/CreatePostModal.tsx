import React, { useState } from 'react'
import { Button, Flex, Input, Modal, Switch, Typography } from 'antd'
import { useCreatePost, type INewPost } from '~/hooks/useCreatePost'
import { useQuery } from 'wagmi/dist/types/utils/query'
import { useAccount } from 'wagmi'
import { useAddressSignature } from '~/hooks/useAddressSignature'
import { useReadNFTContract, useReadTokenContract } from '~/hooks/useReadContract'
import { formatEther } from 'viem'
import { Box } from '@0xsequence/design-system'
import { useGetSetState, useUpdateEffect } from 'react-use'
import useUploadFiles from '~/hooks/useUploadFiles'
import ButtonConnect from '../Headers/ButtonConnect'
import { FileAddOutlined, PlusCircleOutlined } from '@ant-design/icons'

const { Paragraph } = Typography
const { TextArea } = Input

const CreatePostModal: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState(null)
  const [getPost, setPostData] = useGetSetState<INewPost>({ isPublic: true, name: '', description: '' })

  const { mintNFT, isNeedApproveMore, isFreeMint, approveForNftContract, recipient } = useCreatePost()
  const { uploadFiles } = useUploadFiles()

  const { isConnected } = useAccount()

  const { data: _mintFee } = useReadNFTContract('_mintFee', [])
  const { data: symbol } = useReadTokenContract('symbol', [])
  const { data: signature } = useAddressSignature()

  const handleCreatePostMutate = async () => {
    const create: INewPost = getPost()

    await mintNFT.mutateAsync({ newTodo: create, signature })
  }

  const handleCancel = () => setOpen(false)
  const handleOK = () => setOpen(false)

  React.useEffect(() => {
    if (recipient && open) {
      setTimeout(() => {
        Modal.success({ title: 'Success', content: 'Claimed' })
      }, 500)
      handleCancel()
    }
  }, [recipient])

  return (
    <>
      {isConnected ? (
        <Button
          style={{ borderRadius: 200, height: 60, marginLeft: 32, marginRight: 32 }}
          icon={<PlusCircleOutlined />}
          type="primary"
          onClick={() => setOpen(true)}
        >
          {!isConnected ? 'Connect Wallet' : 'Create Your Post'}
        </Button>
      ) : (
        <ButtonConnect />
      )}

      <Modal
        title="Create Post"
        centered
        open={open}
        onOk={handleCancel}
        onCancel={handleOK}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={mintNFT.isPending || uploadFiles.isPending}
            onClick={() => {
              uploadFiles.mutateAsync(files).then(async data => {
                setPostData({ images: data })
                setTimeout(async () => {
                  await handleCreatePostMutate()
                }, 500)
              })
            }}
          >
            Submit
          </Button>,
          isFreeMint && isNeedApproveMore && (
            <Button key="approve" type="primary" onClick={() => approveForNftContract.mutateAsync()}>
              Approve
            </Button>
          )
        ]}
        width={1000}
      >
        <Flex style={{ flexDirection: 'column', gap: 16 }}>
          <Box>
            <Typography.Title level={5} style={{ marginBlockEnd: 4, marginBlockStart: 0 }}>
              Title
            </Typography.Title>
            <Input
              value={getPost().name}
              placeholder="Name"
              onChange={e => {
                setPostData({ name: e.target.value })
              }}
            />
          </Box>

          <Box>
            <Typography.Title level={5} style={{ marginBlockEnd: 4, marginBlockStart: 0 }}>
              Description
            </Typography.Title>
            <TextArea
              placeholder="Description"
              value={getPost().description}
              style={{ height: 200 }}
              onChange={e => setPostData({ description: e.target.value })}
            />
          </Box>
          <Input
            type="file"
            multiple
            onChange={e => {
              setFiles(e.target.files)
            }}
          />
          <Flex>
            <Switch
              style={{ width: 42 }}
              value={getPost().isPublic}
              onChange={checked => {
                setPostData({ isPublic: checked })
              }}
            />
            <Paragraph style={{ marginLeft: 'auto' }}>
              {' '}
              Price: {formatEther((_mintFee ?? 0) as bigint) + ' ' + String(symbol).toUpperCase()}{' '}
            </Paragraph>
          </Flex>
        </Flex>
      </Modal>
    </>
  )
}

export default CreatePostModal
