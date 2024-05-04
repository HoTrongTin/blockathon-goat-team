import { useMutation } from '@tanstack/react-query'
import { get } from 'lodash'
import React from 'react'
import { etherUnits, maxUint256 } from 'viem'
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { ERC_20_ABI, ERC_721_ABI } from '~/constants/abi'
import { useReadTokenContract, useReadNFTContract, GOAT_CONTRACT } from './useReadContract'
import { ethers } from 'ethers'
import { NFT_Contract, MeOnChainServiceInstance } from '../constants/instance'

export interface INewPost {
  name: string
  description: string
  isPublic: boolean
  images?: string[]
  videos?: string[]
  whitelistAddresses?: string[]
}

const getTokenUri = id => `${import.meta.env.VITE_BE_LINK}/post/${id}`

export const useCreatePost = () => {
  const { writeContractAsync, data: hash } = useWriteContract()
  const { address } = useAccount()

  const { data: allowance } = useReadTokenContract('allowance', [address, NFT_Contract])
  const { data: balanceGOAT } = useReadTokenContract('balanceOf', [address])

  const { data: _mintFee } = useReadNFTContract('_mintFee', [])
  const { data: nftBalanceOf } = useReadNFTContract('balanceOf', [address])
  const { data: _limitFreeMint } = useReadNFTContract('_limitFreeMint', [])

  const { data: recipient } = useWaitForTransactionReceipt({ confirmations: 1, hash: hash })

  const isFreeMint = React.useMemo(() => {
    return nftBalanceOf < _limitFreeMint
  }, [_limitFreeMint, nftBalanceOf])
  const isNeedApproveMore = React.useMemo(() => {
    return allowance < _mintFee
  }, [allowance, _mintFee])
  const handleMintNft = async (tokenURI: string, isPublic: boolean = true) => {
    const cminted = await writeContractAsync({
      abi: ERC_721_ABI,
      address: NFT_Contract,
      functionName: 'mint',
      args: [tokenURI, isPublic]
    })

    return cminted
  }

  const approveForNftContract = useMutation({
    mutationKey: ['approve-nft'],
    mutationFn: async () => {
      const approve = await writeContractAsync({
        abi: ERC_20_ABI,
        address: GOAT_CONTRACT,
        functionName: 'approve',
        args: [NFT_Contract, ethers.constants.MaxUint256]
      })
      return approve
    }
  })

  const mintNFT = useMutation({
    mutationKey: ['create-post'],
    mutationFn: async (prop: { newTodo: INewPost; signature?: string }) => {
      const { newTodo, signature } = prop

      const { data: post } = await MeOnChainServiceInstance.post('/post', newTodo, {
        headers: {
          onchainsignature: signature
        }
      })
      const bdid = get(post, 'post.id')
      await handleMintNft(getTokenUri(bdid), newTodo.isPublic)
      return post
    }
  })

  return {
    approveForNftContract,
    mintNFT,
    isFreeMint,
    isNeedApproveMore
  }
}
