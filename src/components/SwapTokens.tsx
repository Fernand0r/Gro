import {
  configureChains,
  erc20ABI,
  goerli, useAccount,
  useBalance, useContract, useContractRead,
  usePrepareSendTransaction,
  useProvider,
  useSendTransaction, useToken,
  useWaitForTransaction
}                                  from 'wagmi'
import { formatEther, parseEther } from "ethers/lib/utils"
import { useState }                from 'react'
import { styled }                                                  from "@mui/material"
import { Card, CardHeader, CardContent, TextField, Button, Stack } from "@mui/material"
import Eth_Abi from '../abi/Weth.json'
import Uni_Abi from '../abi/Uniswap.json'

export const SwapTokens = () => {
  const {address} = useAccount()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const { data: ETH_contract } = useContractRead({
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    abi: Eth_Abi,
  })
  const { data: Uni_contract } = useContractRead({
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    abi: Uni_Abi,
    functionName: 'balanceOf',
    args: [address]
  })
  const { config } = usePrepareSendTransaction({
    request: {
      to: from,
      value: to ? parseEther(to) : undefined
    }
  })
  const { data, sendTransaction } = useSendTransaction(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })
  const StyledTextField = styled(TextField)`
    background-color: white;
  `

  return (
    <Card elevation={3} sx={{
      width: '35vw',
      background: 'linear-gradient(to right bottom, #ff9800, #ed6c02 120%)',
      color: 'white',
      fontSize: '16px'
    }}>
      <CardHeader title="Swap Tokens" sx={{
        textAlign: 'center'
      }}/>
      <CardContent>
        <Stack direction="column" alignItems="stretch" justifyContent="center" spacing={2}>
          <StyledTextField placeholder="token amount" value={from}
                           onChange={(e) => setFrom(e.target.value)}
                           InputProps={{
                             endAdornment: 'ETH'
                           }}
          />
          <p style={{ textAlign: "center" }}>↓</p>
          <StyledTextField placeholder="token amount" value={to}
                           onChange={(e) => setTo(e.target.value)}
                           InputProps={{
                             endAdornment: 'Uni'
                           }}
          />
          <Button sx={{ bgcolor: '#4caf50', color: 'white' }} onClick={() => sendTransaction?.()}>
            {isLoading ? 'Loading...' : isSuccess ? 'Success' : 'Send'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}