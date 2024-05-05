import { Button, Modal } from 'antd'
import { DollarCircleFilled } from '@ant-design/icons'
import { useAccount, useWriteContract } from 'wagmi'
import { ERC_20_ABI } from '~/constants/abi'
import { checksumAddress, parseEther } from 'viem'
import { GOAT_CONTRACT, MeOnChainServiceInstance } from '~/constants/instance'
import { useQuery } from '@tanstack/react-query'
import { get } from 'lodash'
import { useAddressSignature } from '~/hooks/useAddressSignature'

export const DonateOrClaim = ({ author, postId }) => {
  const { address } = useAccount()

  if (address?.toLowerCase() === author?.toLowerCase()) return <ClaimButton postId={postId} />

  return <DonateButton author={author} />
}

export function DonateButton({ author }) {
  const { writeContractAsync, data, isPending } = useWriteContract()

  const donate = async () => {
    await writeContractAsync({
      abi: ERC_20_ABI,
      address: GOAT_CONTRACT,
      functionName: 'transfer',
      args: [author, parseEther('1')]
    })
  }

  return (
    <Button onClick={donate} icon={<DollarCircleFilled />}>
      {isPending ? 'Donating...' : 'Donate $GOAT'}
    </Button>
  )
}

export function ClaimButton({ postId }) {
  // const [modal] = Modal.useModal()
  const { data: signature } = useAddressSignature()
  const { refetch: refetchViewData, isLoading } = useQuery({
    queryKey: [postId, 'view-reward'],
    queryFn: async () => {
      if (!postId) return null
      const { data } = await MeOnChainServiceInstance.post(`/reward/claim?type=view&postId=${postId}`, null, {
        headers: {
          onchainsignature: signature
        }
      })
      return data
    },
    enabled: false
  })
  return (
    <Button
      ghost
      type="primary"
      onClick={() => {
        refetchViewData().then(() => {
          Modal.success({ title: 'Success', content: 'Claimed' })
        })
      }}
      icon={<DollarCircleFilled />}
    >
      {isLoading ? 'Claiming...' : 'Claim $GOAT'}
    </Button>
  )
}
