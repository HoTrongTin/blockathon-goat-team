import React from 'react'
import { useReadContract } from 'wagmi'
import { ERC_20_ABI, ERC_721_ABI } from '~/constants/abi'
import { GOAT_CONTRACT, NFT_Contract } from '~/constants/instance'



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
