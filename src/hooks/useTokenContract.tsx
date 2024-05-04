import React from 'react'
import { useReadContract } from 'wagmi'
import { ERC_20_ABI } from '~/constants/abi'

const useTokenContract = (method: string = 'balanceOf') => {
  const tokenContract = useReadContract({
    abi: ERC_20_ABI,
    functionName: method,
    args: ['0xf74B4d9838Fdb2B2F9Ef54B3893eFA503e2072A1'],
    address: '0xA2b34213723B019Aec1695A7c2a21539AAeABA54'
  })

  console.log('🚀 ~ useTokenContract ~ balance:', tokenContract, tokenContract.data as string)

  return tokenContract
}

export default useTokenContract
