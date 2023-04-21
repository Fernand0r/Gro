import { useAccount } from "wagmi"
import {
  useBatchHandlerCancelInvest,
  useBatchHandlerGetUserInvestTimes,
  usePrepareBatchHandlerCancelInvest
}                     from "../generatedABIsForFantomTestnet"
import { BigNumber }  from "ethers"

export const useCancelBatchHandlerInvest = () => {
  const { address } = useAccount()
  const { data: investTimes, isSuccess: isGetUserInvestTimesSuccess } =
    useBatchHandlerGetUserInvestTimes({ args: [address!] })
  const enabled = isGetUserInvestTimesSuccess && investTimes?.gt(0)

  const { config: cancelDepositConfig } =
    usePrepareBatchHandlerCancelInvest({
      args: [BigNumber.from(investTimes ? investTimes.toNumber() - 1 : 0)],
      enabled
    })
  const {
    write: cancelInvest,
    isError,
    isSuccess
  } = useBatchHandlerCancelInvest(cancelDepositConfig)

  return {
    cancelInvest,
    isError,
    isSuccess
  }
}
