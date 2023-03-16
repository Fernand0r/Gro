import { getDefaultClient } from 'connectkit'
import { createClient, mainnet, goerli } from 'wagmi'

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: 'My wagmi + ConnectKit App',
    infuraId: import.meta.env.VITE_INFURA_API_KEY!,
    chains: [goerli],
  })
)
