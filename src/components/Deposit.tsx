import { useBalance, useAccount }                           from "wagmi"
import { TokenAddressesMapping }                            from "@/types/tokenAddresses"
import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material"
import { useState }                                         from "react"
import { css }                                              from "@emotion/react"
import { useLocalStorage }                                  from "usehooks-ts"
import { useCancelBatchHandlerInvest }                      from "@/hooks/useCancelBatchHandlerInvest"
import { useCustomBatchHandlerDeposit }                     from "@/hooks/useCustomBatchHandlerDeposit"
import { useTestTokenErc20Approve }                         from "@/hooks/useTestTokenErc20Approve"

export const Deposit = () => {
  const { address } = useAccount()
  const [amount, setAmount] = useState("0")
  const [tx, setTx] = useLocalStorage("transactionsHash", "")
  const { data: testTokenBalance } = useBalance({
    address,
    token: TokenAddressesMapping.TestToken
  })
  const { isSuccess: isPreApproveSuccess, write: approve } = useTestTokenErc20Approve(amount)
  const {
    data: depositResponse,
    isLoading,
    isSuccess,
    isError,
    write: deposit
  } = useCustomBatchHandlerDeposit(amount)
  const { cancelInvest, isSuccess: isCancelSuccess } =
    useCancelBatchHandlerInvest()

  const updateAmount = (value: string) => {
    if (value.match(/^(\d+)?(\.\d{0,18})?$/)) {
      setAmount(value)
    }
  }

  const styles = {
    input: css`
      background-color: #fff;
      border: 1px solid red;
    `,
    card: css`
      width: 35vw;
      background: linear-gradient(to right bottom, #ff9800, #ed6c02 120%);
      color: white;
      font-size: 16px;
    `
  }

  // useEffect(() => {
  //   if (!depositResponse || !isSuccess) return
  //   setTx(depositResponse.hash)
  // }, [depositResponse])

  return (
    <Card
      elevation={3}
      css={styles.card}
    >
      <CardHeader
        title="Deposit TestToken"
        sx={{
          textAlign: "center"
        }}
      />
      <CardContent>
        <p>TestToken Balance: {testTokenBalance?.formatted}</p>
        <TextField
          css={styles.input}
          value={amount}
          onChange={e => updateAmount(e.target.value)}
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
          disabled={!cancelInvest}
          sx={{ bgcolor: "#4caf50", color: "white", width: "100%", mt: 2 }}
          onClick={() => {
            cancelInvest?.()
          }}
        >
          Cancel Deposit
        </Button>
      </CardContent>
    </Card>
  )
}
