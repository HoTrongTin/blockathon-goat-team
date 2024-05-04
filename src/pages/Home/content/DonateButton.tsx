import { Button } from 'antd'
import { DollarCircleFilled } from '@ant-design/icons'
import { useWriteContract } from 'wagmi'
import { ERC_20_ABI } from '~/constants/abi'
import { parseEther } from 'viem'
import { GOAT_CONTRACT } from '~/constants/instance'

export function DonateButton({ author }) {
  const { writeContractAsync, data, isPending } = useWriteContract()

  const donate = async () => {
    await writeContractAsync({
      abi: ERC_20_ABI,
      address: GOAT_CONTRACT,
      functionName: 'transfer',
      args: [author, parseEther('10')]
    })
  }

  return (
    <Button onClick={donate} icon={<DollarCircleFilled />}>
      {isPending ? 'Donating...' : 'Donate 10 $GOAT'}
    </Button>
  )
}
