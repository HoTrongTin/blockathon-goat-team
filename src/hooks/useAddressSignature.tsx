import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'react-use'
import { useAccount, useDisconnect } from 'wagmi'

export function useAddressSignature() {
  const { address: account } = useAccount()
  const query = useQuery({
    queryKey: ['address-signature:', account],
    queryFn: ({ queryKey }) => {
      if (!account) return
      const sign = localStorage.getItem(queryKey.join(''))
      return sign
    }
  })

  return query
}
