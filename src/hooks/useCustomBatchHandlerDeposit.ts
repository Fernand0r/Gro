import {
  useBatchHandlerDeposit,
  usePrepareBatchHandlerDeposit
}                    from "../generatedABIsForFantomTestnet"
import { BigNumber } from "ethers"

export const useCustomBatchHandlerDeposit = (
  amount: string
): ReturnType<typeof useBatchHandlerDeposit> => {
  const amountNumber = Number(amount)
  const enabled = amountNumber > 0
  const { config: depositConfig, isSuccess: isPreparedDeposit } =
    usePrepareBatchHandlerDeposit({
      enabled,
      args: [BigNumber.from(amountNumber)]
    })

  return useBatchHandlerDeposit(depositConfig)
}
