import { getDefaultClient }     from 'connectkit'
import { createClient, goerli } from 'wagmi'
import { fantomTestnet }        from "wagmi/chains"

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: 'My wagmi + ConnectKit App',
    chains: [fantomTestnet, goerli],
  })
)
