import { Account, Address } from 'viem'
import { useWalletClient } from 'wagmi'
import { debounce } from 'lodash'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useSignConnect = () => {
  const { refetch } = useWalletClient({})
  const qClient = useQueryClient()
  const _signMessage = async (address: string) => {
    const client = await refetch()

    const message = 'Welcome to this incredible app! Please sign this message to prove your identity.'

    // sign
    const sig = await client.data.signMessage({
      message,
      account: address as Address
    })
    console.log('🚀 ~ const_signMessage= ~  sig:', sig)
    const qKey = ['address-signature:', address]
    qClient.setQueryData(qKey, sig)
    localStorage.setItem(qKey.join(''), sig)
    return sig
  }

  return {
    signMessage: debounce(_signMessage, 2000)
  }
}
