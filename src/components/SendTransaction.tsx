import { useState }                                                from 'react'
import {
  usePrepareSendTransaction, useProvider,
  useSendTransaction,
  useWaitForTransaction
}                                                                  from 'wagmi'
import { formatUnits, parseEther }                                 from "ethers/lib/utils"
import { Card, CardHeader, CardContent, TextField, Button, Stack } from "@mui/material"

export function SendTransaction() {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const { config } = usePrepareSendTransaction({
    request: {
      to,
      value: amount ? parseEther(amount) : undefined
    }
  })
  const { data, sendTransaction } = useSendTransaction(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })
  const [gasPrice, setGasPrice] = useState('0')
  const provider = useProvider()
  provider.getGasPrice().then((code) => {
    console.log(formatUnits(code, 'gwei'))
    setGasPrice((formatUnits(code, 'gwei')))
  })

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
