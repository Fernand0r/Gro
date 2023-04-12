import { useState }                                                from 'react'
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction
}                                                                  from 'wagmi'
import { parseEther }                                              from "ethers/lib/utils"
import { Card, CardHeader, CardContent, TextField, Button, Stack } from "@mui/material"
import { useGasPrice }                                             from "@/hooks/useGasPrice"

export function SendTransaction() {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const { config } = usePrepareSendTransaction({
    request: {
      to,
      value: parseEther(Number(amount) > 0 ? amount : '0')
    },
    enabled: !!to && !!amount
  })
  const { data, sendTransaction, isSuccess: isSent } = useSendTransaction(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    enabled: isSent
  })
  const gasPrice = useGasPrice('gwei')

  return (
    <Card elevation={3} sx={{
      width: '35vw',
      background: 'linear-gradient(to right bottom, #ba68c8, #9c27b0 120%)',
      color: 'white',
      fontSize: '16px'
    }}>
      <CardHeader title="Transfer ETH" sx={{
        textAlign: 'center'
      }} />
      <CardContent>
        <p>Gas Price: {gasPrice}gwei</p>
        <Stack direction="column" justifyContent="center" spacing={2}>
          <TextField placeholder="recipient" value={to} sx={{ backgroundColor: 'white' }}
                     onChange={(e) => setTo(e.target.value)} />
          <TextField placeholder="amount" value={amount} sx={{ backgroundColor: 'white' }}
                     onChange={(e) => setAmount(e.target.value)} />
          <Button sx={{ bgcolor: '#4caf50', color: 'white' }} onClick={() => sendTransaction?.()}>
            {isLoading ? 'Loading...' : isSuccess ? 'Success' : 'Send'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
