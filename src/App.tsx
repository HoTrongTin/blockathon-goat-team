import { sequence } from '0xsequence'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Chain, sepolia } from 'viem/chains'
import { WagmiProvider, createConfig, http } from 'wagmi'

import Demo from '~/pages/Demo'

import '@0xsequence/design-system/styles.css'
import { ConfigProvider } from 'antd'
import GlobalService from './GlobalService'
import './index.css'
import HomePage from './pages/Home'

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

  const connectors = []

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
          borderRadius: 2,
          colorBgContainer: '#f6ffed'
        }
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <GlobalService>
            <RouterProvider router={router} />
          </GlobalService>
        </QueryClientProvider>
      </WagmiProvider>
    </ConfigProvider>
  )
}

export default App
