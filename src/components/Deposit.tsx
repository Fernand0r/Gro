import { useBalance, useAccount } from "wagmi"
import { TokenAddressesMapping }                                             from "../types/tokenAddresses"
import {
  usePrepareBatchHandlerDeposit,
  useBatchHandlerDeposit,
  useErc20Approve,
  usePrepareErc20Approve
}                                                                            from "../generatedABIsForFantomTestnet"
import { parseEther }                                                        from "ethers/lib/utils"
import { Button, Card, CardContent, CardHeader, TextField }                  from "@mui/material"
import { useState }                                                          from "react"

export const Deposit = () => {
  const { address } = useAccount()
  const [amount, setAmount] = useState('0')
  const { data: testTokenBalance } = useBalance({ address, token: TokenAddressesMapping.TestToken })
  const { config: testTokenConfig } = usePrepareErc20Approve({
    args: [TokenAddressesMapping.TestToken, parseEther('1000')]
  })
  const { write: approve } = useErc20Approve(testTokenConfig)
  const { config: depositConfig } = usePrepareBatchHandlerDeposit({
    args: [parseEther('1')]
  })
  const { write: deposit, data: depositResponse, isLoading, isSuccess } = useBatchHandlerDeposit(depositConfig)


  return <Card elevation={3} sx={{
    width: '35vw',
    background: 'linear-gradient(to right bottom, #ff9800, #ed6c02 120%)',
    color: 'white',
    fontSize: '16px'
  }}>
    <CardHeader title="Deposit TestToken" sx={{
      textAlign: 'center'
    }} />
    <CardContent>
      <p>TestToken Balance: {testTokenBalance?.formatted}</p>
      <TextField value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Button sx={{ bgcolor: '#4caf50', color: 'white', width: '100%' }} onClick={() => {
        approve?.()
        deposit?.()
      }}>
        {isLoading ? 'Loading...' : isSuccess ? 'Success' : 'Send'}
      </Button>
    </CardContent>
  </Card>
}