import axios from 'axios';

export const NFT_Contract = '0x580ba32A3Fc52DceaC12721858333E8376A39cA2';

export const MeOnChainServiceInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_LINK
});
