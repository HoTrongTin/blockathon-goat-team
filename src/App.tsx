import { sequence } from '0xsequence'
import { ThemeProvider } from '@0xsequence/design-system'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Chain, sepolia } from 'viem/chains'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { walletConnect } from 'wagmi/connectors'

import Demo from '~/pages/Demo'

import '@0xsequence/design-system/styles.css'
import './index.css'
import HomePage from './pages/Home'
import { ConfigProvider } from 'antd'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/demo',
    element: <Demo />
  }
])

const App = () => {
  const chains = [sepolia] as [Chain, ...Chain[]]

  const connectors = [
    walletConnect({
      projectId: 'b87cf8b78e1c5a9881adabe5765d2461',
      showQrModal: true
    })
  ]

  const transports = {}

  chains.forEach(chain => {
    const network = sequence.network.findNetworkConfig(sequence.network.allNetworks, chain.id)
    if (!network) return
    transports[chain.id] = http(network.rpcUrl)
  })

  const wagmiConfig = createConfig({
    chains,
    connectors,
    transports
  })

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#00b96b',
          borderRadius: 2,

          // Alias Token
          colorBgContainer: '#f6ffed'
        }
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WagmiProvider>
    </ConfigProvider>
  )
}

export default App
