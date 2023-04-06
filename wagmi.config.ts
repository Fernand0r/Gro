import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import { erc20ABI } from 'wagmi'
import { mainnet, fantomTestnet, goerli } from 'wagmi/chains'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  out: `src/generatedABIsForFantomTestnet.ts`,
  contracts: [
    {
      name: 'erc20',
      abi: erc20ABI,
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      contracts: [
        // {
        //   name: 'QuoterV2',
        //   address: {
        //     [mainnet.id]: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
        //     [goerli.id]: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
        //   },
        // },
        // {
        //   name: 'SwapRouter02',
        //   address: {
        //     [mainnet.id]: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        //     [goerli.id]: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        //   },
        // },
        {
          name: 'BatchHandler',
          address: {
            [fantomTestnet.id]: '0x0fD2ffFe0B6a03b314eaf79fD009b802bbd4F312'
          },
        },
        {
          name: 'TestToken',
          address: {
            [fantomTestnet.id]: '0x10d5869b8aC671743a67eaaBA7Af33FE516a46d4'
          },
        },
      ],
      chainId: fantomTestnet.id,
    }),
    react(),
  ],
})
