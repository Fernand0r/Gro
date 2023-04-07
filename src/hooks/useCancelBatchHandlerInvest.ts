import { useAccount } from "wagmi"
import { useCallback, useEffect, useState } from "react"
import {
  useBatchHandlerCancelInvest,
  useBatchHandlerGetUserInvestTimes,
  usePrepareBatchHandlerCancelInvest,
} from "../generatedABIsForFantomTestnet"
import { parseUnits, formatUnits, hexlify, parseEther } from "ethers/lib/utils"

export const useCancelBatchHandlerInvest = () => {
  const { address } = useAccount()
  // const [result, setResult] = useState<{
  //   cancelInvest: (() => void) | undefined
  //   isError?: boolean
  //   isSuccess?: boolean
  // }>({
  //   cancelInvest: () => {},
  // })
  const {
    data: investTimes,
    isSuccess: isGetUserInvestTimesSuccess,
    isError: isGetUserInvestTimesError,
    isLoading: isGetUserInvestTimesLoading,
  } = useBatchHandlerGetUserInvestTimes({ args: [address!] })

  if (isGetUserInvestTimesError || isGetUserInvestTimesLoading) return
  console.log("investTimes", investTimes!.toNumber())
  const { config: cancelDepositConfig } = usePrepareBatchHandlerCancelInvest({
    args: [parseEther(String(investTimes!.toNumber() - 1))],
  })
  const {
    write: cancelInvest,
    isError,
    isSuccess,
  } = useBatchHandlerCancelInvest(cancelDepositConfig)

  const cancelDeposit = useCallback(() => {
    cancelInvest?.()
  }, [cancelInvest])

  return {
    cancelInvest: cancelDeposit,
    isError,
    isSuccess,
  }
}
