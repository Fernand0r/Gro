import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import { erc20ABI } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'
import * as dotenv from 'dotenv'

dotenv.config()

console.log('process.env.ETHERSCAN_API_KEY', process.env.ETHERSCAN_API_KEY)

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'erc20',
      abi: erc20ABI,
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: goerli.id,
      contracts: [
        {
          name: 'QuoterV2',
          address: {
            [mainnet.id]: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
            [goerli.id]: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
          },
        },
        {
          name: 'SwapRouter02',
          address: {
            [mainnet.id]: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
            [goerli.id]: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
          },
        },
      ],
    }),
    react(),
  ],
})
