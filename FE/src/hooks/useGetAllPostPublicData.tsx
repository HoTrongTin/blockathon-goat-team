import React from 'react'
import { useReadNFTContract } from './useReadContract'
import { useQuery } from 'wagmi/dist/types/utils/query'
import { useContractInfiniteReads, useReadContract } from 'wagmi'

const useGetAllPostPublicData = () => {
  const {data: _totalSupply} = useReadNFTContract('_totalSupply',[])
  // useReadContract({ abi: ERC_721_ABI, address: NFT_Contract })
  

}

export default useGetAllPostPublicData