import React from 'react'
import { useReadContract } from 'wagmi'
import { ERC_20_ABI, ERC_721_ABI } from '~/constants/abi'

export const GOAT_CONTRACT = '0xA2b34213723B019Aec1695A7c2a21539AAeABA54'
export const NFT_Contract = '0x580ba32A3Fc52DceaC12721858333E8376A39cA2'

export const useReadTokenContract = (method: string, args: any[]) => {
  const tokenContract = useReadContract({
    abi: ERC_20_ABI,
    functionName: method,
    args,
    address: GOAT_CONTRACT
  })

  return tokenContract
}
export const useReadNFTContract = (method: string, args: any[]) => {
  const tokenContract = useReadContract({
    abi: ERC_721_ABI,
    functionName: method,
    args,
    address: NFT_Contract
  })

  return tokenContract
}
