import { useAccount, useContract, useContractWrite, usePrepareContractWrite, useProvider, useSigner } from 'wagmi'
import {
  formatEther,
  parseEther,
  parseUnits
}                                                                                                     from "ethers/lib/utils"
import { useEffect, useState }                                                                        from 'react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  styled,
  TextField
}                                                                                                     from "@mui/material"
import { useDebounce }                                                                                from 'usehooks-ts'
import {
  erc20ABI,
  quoterV2ABI,
  usePrepareSwapRouter02ExactInputSingle,
  useSwapRouter02ExactInputSingle
}                                                                                                     from "../generated"
import {
  FeeAmount,
  QuoterV2ContractAddress, SwapRouter02ContractAddress,
  TokenAddress
} from "../constants/uniswap"
import { ContractTransaction }                                                                        from "ethers"

export const SwapTokens = () => {
  const { address } = useAccount()
  const [exchangeRate, setExchangeRate] = useState('')
  const [from, setFrom] = useState('0')
  const [to, setTo] = useState('0')
  const debounceFrom = useDebounce(from, 500)
  const debounceTo = useDebounce(to, 500)
  const [direction, setDirection] = useState<'column' | 'column-reverse'>('column')

  // Get a quote without gas fees
  const uni_contract = useContract({
    address: QuoterV2ContractAddress,
    abi: quoterV2ABI,
    signerOrProvider: useProvider()
  })

  const quote = (isWeth2Uni: boolean, tokenAmountIn: string): Promise<ContractTransaction> | undefined => {
    return uni_contract?.callStatic.quoteExactInputSingle({
      tokenIn: TokenAddress[isWeth2Uni ? 'WETH' : 'UNI'],
      tokenOut: TokenAddress[isWeth2Uni ? 'UNI' : 'WETH'],
      amountIn: parseEther(tokenAmountIn),
      fee: FeeAmount.MEDIUM,
      sqrtPriceLimitX96: parseEther('0')
    })
  }

  const { config: approveConfig } = usePrepareContractWrite({
    address: direction === 'column' ? TokenAddress.WETH : TokenAddress.UNI,
    abi: erc20ABI,
    functionName: 'approve',
    args: [SwapRouter02ContractAddress, parseEther('0.1')]
  })
  const { write: approve } = useContractWrite(approveConfig)

  useEffect(() => {
    const isWeth2Uni = direction === 'column'
    const tokenAmountIn = isWeth2Uni ? from : to
    if (Number(tokenAmountIn) > 0) {
      quote(isWeth2Uni, tokenAmountIn)?.then((code: any) => {
        console.log('code:', formatEther(code?.amountOut))
        if (isWeth2Uni) {
          setTo(formatEther(code?.amountOut))
        } else {
          setFrom(formatEther(code?.amountOut))
        }
      })
    }
  }, [debounceFrom, debounceTo, direction])

  quote(true, '1')?.then((code: any) => {
    setExchangeRate(formatEther(code?.amountOut))
  })

  const { config, error } = usePrepareSwapRouter02ExactInputSingle({
    args: [{
      tokenIn: direction === 'column' ? TokenAddress.WETH : TokenAddress.UNI,
      tokenOut: direction === 'column' ? TokenAddress.UNI : TokenAddress.WETH,
      fee: FeeAmount.MEDIUM,
      recipient: address!,
      // amountIn: parseUnits(direction === 'column' ? debounceFrom : debounceTo),
      amountIn: parseUnits('0.02'),
      amountOutMinimum: parseUnits('0.1'),
      // amountOutMinimum: parseUnits(String(Number(direction === 'column' ? debounceTo : debounceFrom)*0.95)),
      sqrtPriceLimitX96: parseEther('0')
    }]
  })
  const { isSuccess, isLoading, write } = useSwapRouter02ExactInputSingle(config)
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
      }} />
      <CardContent>
        <Stack direction={direction} alignItems="stretch" justifyContent="center" spacing={2}>
          <StyledTextField placeholder="token amount"
                           value={from}
                           onChange={(e) => {
                             console.log('from:', parseUnits(e.target.value, 18))
                             setFrom(e.target.value)
                           }
                           }
                           InputProps={{
                             endAdornment: 'ETH'
                           }}
          />
          <p style={{ textAlign: "center", cursor: 'pointer' }}
             onClick={() => setDirection(direction === 'column' ? 'column-reverse' : 'column')}>↓</p>
          <StyledTextField placeholder="token amount"
                           value={to}
                           onChange={(e) =>
                             setTo(e.target.value)
                           }
                           InputProps={{
                             endAdornment: 'Uni'
                           }}
          />
        </Stack>
        <p>ExchangeRate: 1 ETH = {exchangeRate} Uni</p>
        <Button sx={{ bgcolor: '#4caf50', color: 'white', width: '100%' }} onClick={() => {
          // approve?.()
          write?.()
        }}>
          {isLoading ? 'Loading...' : isSuccess ? 'Success' : 'Send'}
        </Button>
      </CardContent>
    </Card>
  )
}