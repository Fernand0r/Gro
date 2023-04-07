import { useBalance, useAccount } from "wagmi"
import { TokenAddressesMapping } from "../types/tokenAddresses"
import {
  usePrepareBatchHandlerDeposit,
  useBatchHandlerDeposit,
  useErc20Approve,
  usePrepareErc20Approve,
} from "../generatedABIsForFantomTestnet"
import { parseEther } from "ethers/lib/utils"
import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { css } from "@emotion/react"
import { useLocalStorage } from "usehooks-ts"
import { useCancelBatchHandlerInvest } from "../hooks/useCancelBatchHandlerInvest"

export const Deposit = () => {
  const { address } = useAccount()
  const [amount, setAmount] = useState("0")
  const { data: testTokenBalance } = useBalance({
    address,
    token: TokenAddressesMapping.TestToken,
  })
  const { config: testTokenConfig, data: approveResponse } =
    usePrepareErc20Approve({
      address: TokenAddressesMapping.TestToken,
      args: [TokenAddressesMapping.BatchHandler, parseEther("10")],
    })
  const { write: approve } = useErc20Approve(testTokenConfig)
  const { config: depositConfig } = usePrepareBatchHandlerDeposit({
    args: [parseEther(amount) || undefined],
  })
  const {
    write: deposit,
    data: depositResponse,
    isLoading,
    isSuccess,
  } = useBatchHandlerDeposit(depositConfig)

  const result = useCancelBatchHandlerInvest()

  const inputStyle = css`
    background-color: #fff;
    border: 1px solid red;
  `

  useEffect(() => {
    if (isSuccess) {
      useLocalStorage("transactionsHash", depositResponse?.hash)
    }
  }, [depositResponse])

  return (
    <Card
      elevation={3}
      sx={{
        width: "35vw",
        background: "linear-gradient(to right bottom, #ff9800, #ed6c02 120%)",
        color: "white",
        fontSize: "16px",
      }}
    >
      <CardHeader
        title="Deposit TestToken"
        sx={{
          textAlign: "center",
        }}
      />
      <CardContent>
        <p>TestToken Balance: {testTokenBalance?.formatted}</p>
        <TextField
          sx={inputStyle}
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <Button
          sx={{ bgcolor: "#4caf50", color: "white", width: "100%" }}
          onClick={() => {
            approve?.()
            deposit?.()
          }}
        >
          {isLoading ? "Loading..." : isSuccess ? "Success" : "Deposit"}
        </Button>
        <Button
          disabled={!result}
          sx={{ bgcolor: "#4caf50", color: "white", width: "100%", mt: 2 }}
          onClick={() => {
            console.log("result", result)
            result?.cancelInvest?.()
          }}
        >
          Cancel Deposit
        </Button>
      </CardContent>
    </Card>
  )
}
