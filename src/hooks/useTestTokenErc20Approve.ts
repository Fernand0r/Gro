import {
  useErc20Approve,
  usePrepareErc20Approve
}                                from "../generatedABIsForFantomTestnet"
import { TokenAddressesMapping } from "../types/tokenAddresses"
import { BigNumber }             from "ethers"

export const useTestTokenErc20Approve = (
  amount: string
): ReturnType<typeof useErc20Approve> => {
  const amountNumber = Number(amount)
  const enabled = amountNumber > 0
  const { config: testTokenConfig } = usePrepareErc20Approve({
    enabled,
    address: TokenAddressesMapping.TestToken,
    args: [TokenAddressesMapping.BatchHandler, BigNumber.from(amountNumber)]
  })
  return useErc20Approve(testTokenConfig)
}
