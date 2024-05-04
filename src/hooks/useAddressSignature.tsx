import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

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
