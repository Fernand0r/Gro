import {
  useBatchHandlerDeposit,
  useErc20Approve,
  usePrepareBatchHandlerDeposit,
  usePrepareErc20Approve,
} from "../generatedABIsForFantomTestnet"
import { TokenAddressesMapping } from "../types/tokenAddresses"
import { parseEther } from "ethers/lib/utils"
import { useEffect, useState } from "react"

export const useCustomBatchHandlerDeposit = (
  amount: string
): ReturnType<typeof useBatchHandlerDeposit> => {
  // const defaultResult = {
  //   data: undefined,
  //   isLoading: false,
  //   isSuccess: false,
  //   isError: false,
  //   write: () => {},
  // }
  // const [hookState, setHookState] =
  //   useState<ReturnType<typeof useBatchHandlerDeposit>>()
  // if (!amount || Number(amount) <= 0) return

  const { config: depositConfig, isSuccess: isPreparedDeposit } =
    usePrepareBatchHandlerDeposit({
      args: [parseEther(Number(amount) > 0 ? amount : '0')],
    })

  return useBatchHandlerDeposit(depositConfig)
}
