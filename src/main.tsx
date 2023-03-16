import { ConnectKitProvider } from 'connectkit'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiConfig } from 'wagmi'

import { App } from './App'
import { client } from './wagmi'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  </StrictMode>,
)
