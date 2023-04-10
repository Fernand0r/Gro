import {
  useErc20Approve,
  usePrepareErc20Approve,
} from "../generatedABIsForFantomTestnet"
import { TokenAddressesMapping } from "../types/tokenAddresses"
import { parseEther } from "ethers/lib/utils"
import { useEffect, useState } from "react"

export const useTestTokenErc20Approve = (
  amount: string
): ReturnType<typeof useErc20Approve> => {
  // if (!amount || Number(amount) <= 0) return
  // const [hookState, setHookState] =
  //   useState<ReturnType<typeof useErc20Approve>>()
  const { config: testTokenConfig, isSuccess } = usePrepareErc20Approve({
    address: TokenAddressesMapping.TestToken,
    args: [TokenAddressesMapping.BatchHandler, parseEther(Number(amount) > 0 ? amount : '0')],
  })
  return useErc20Approve(testTokenConfig)
}
