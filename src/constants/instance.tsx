import axios from 'axios'

export const GOAT_CONTRACT = '0xA2b34213723B019Aec1695A7c2a21539AAeABA54'
export const NFT_Contract ='0xB7E664E9CE178Bd8aF9BeCdb880C9d762C249a53'// '0x580ba32A3Fc52DceaC12721858333E8376A39cA2'
export const MeOnChainServiceInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_LINK
})
