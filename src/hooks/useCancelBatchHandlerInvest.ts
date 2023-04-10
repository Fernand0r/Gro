import { useAccount } from "wagmi"
import {
  useBatchHandlerCancelInvest,
  useBatchHandlerGetUserInvestTimes,
  usePrepareBatchHandlerCancelInvest,
} from "../generatedABIsForFantomTestnet"
import { BigNumber } from "ethers"

export const useCancelBatchHandlerInvest = () => {
  const { address } = useAccount()
  const { data: investTimes, isSuccess: isGetUserInvestTimesSuccess } =
    useBatchHandlerGetUserInvestTimes({ args: [address!] })
  const isReady = isGetUserInvestTimesSuccess && investTimes?.gt(0)

  if (!isReady) return {}

  const { config: cancelDepositConfig, data: cancel_prefetch } =
    usePrepareBatchHandlerCancelInvest({
      args: [BigNumber.from(investTimes!.toNumber() - 1)],
    })
  const {
    write: cancelInvest,
    isError,
    isSuccess,
  } = useBatchHandlerCancelInvest(cancelDepositConfig)

  console.log("cancel_prefetch:", cancel_prefetch)

  return {
    cancelInvest,
    isError,
    isSuccess,
  }
}
