/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export enum FeeAmount {
  LOWEST = 100,
  LOW = 500,
  MEDIUM = 3000,
  HIGH = 10000
}

export enum TokenAddress {
  WETH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  ETH = '0xC73E8Cc634c20DC01C65ddf81B363f7Eb809B64d',
  UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
}

export const QuoterV2ContractAddress = '0x61fFE014bA17989E743c5F6cB21bF9697530B21e'
export const SwapRouter02ContractAddress = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
export const amountRegExp = /^\d+\.?\d*$/