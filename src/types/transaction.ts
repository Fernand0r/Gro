import { BigNumber } from "ethers"

export type Transaction = {
  from: `0x${string}`,
  to: `0x${string}`,
  gasLimit: string,
  maxFeePerGas: string
  maxPriorityFeePerGas: string
  nonce: string
  value: BigNumber,
}
