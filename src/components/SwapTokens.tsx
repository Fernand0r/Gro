import {
  useAccount
}                                     from 'wagmi'
import {
  parseEther
}                                     from "ethers/lib/utils"
import { useEffect, useState }        from 'react'
import { css }                        from '@emotion/react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField
}                                     from "@mui/material"
import { useDebounce, useEffectOnce } from 'usehooks-ts'
import {
  useErc20Approve,
  usePrepareErc20Approve,
  usePrepareSwapRouter02ExactInputSingle,
  useSwapRouter02ExactInputSingle
}                                     from "@/generated"
import {
  amountRegExp,
  FeeAmount,
  SwapRouter02ContractAddress,
  TokenAddress
}                                     from "@/constants/uniswap"
import { BigNumber }                  from "ethers"
import { useUniSwapQuote }            from "@/hooks/useUniSwapQuote"

export const SwapTokens = () => {
  const { address } = useAccount()
  const [from, setFrom] = useState('0')
  const [to, setTo] = useState('0')
  const debounceFrom = useDebounce(from, 500)
  const debounceTo = useDebounce(to, 500)
  const [direction, setDirection] = useState<'column' | 'column-reverse'>('column')
  const [amountIn, setAmountIn] = useState('1')
  const [amountOut, setAmountOut] = useState('0')

  const [exchangeRate, setExchangeRate] = useUniSwapQuote()
  const [quote, setQuote] = useUniSwapQuote()
  const { config: approveConfig } = usePrepareErc20Approve({
    address: direction === 'column' ? TokenAddress.WETH : TokenAddress.UNI,
    args: [SwapRouter02ContractAddress, parseEther('0.1')]
  })
  const { write: approve } = useErc20Approve({ ...approveConfig })
  const isWeth2Uni = () => direction === 'column'

  useEffectOnce(() => {
    setExchangeRate(isWeth2Uni(), '1')
  })

  useEffect(() => {
    const tokenAmountIn = isWeth2Uni() ? from : to

    if (Number(tokenAmountIn) > 0) {
      setQuote(isWeth2Uni(), tokenAmountIn)
      if (isWeth2Uni()) {
        setTo(quote)
      } else {
        setFrom(quote)
      }
      setAmountOut(quote)
    }

    setAmountIn(direction === 'column' ? debounceFrom : debounceTo)
  }, [debounceFrom, debounceTo, direction, quote])

  const { config, error } = usePrepareSwapRouter02ExactInputSingle({
    args: [{
      tokenIn: direction === 'column' ? TokenAddress.WETH : TokenAddress.UNI,
      tokenOut: direction === 'column' ? TokenAddress.UNI : TokenAddress.WETH,
      fee: FeeAmount.MEDIUM,
      recipient: address!,
      amountIn: parseEther(amountIn),
      amountOutMinimum: parseEther(amountOut),
      sqrtPriceLimitX96: parseEther('0')
    }],
    overrides: {
      gasLimit: BigNumber.from(1000000),
      value: parseEther(amountIn)
    }
  })
  const { isSuccess, isLoading, isError, write, data: swapResponse } = useSwapRouter02ExactInputSingle(config)

  const swap = () => {
    approve?.()
    write?.()
  }

  const currentExchangeRate = (): string => {
    return `ExchangeRate: 1 ${direction === 'column' ? 'ETH' : 'UNI'} = ${direction === 'column' ? exchangeRate : (1 / Number(exchangeRate))} ${direction === 'column' ? 'UNI' : 'ETH'}`
  }

  const updateFrom = (value: string) => {
    value = amountRegExp.test(value) ? value : '0'
    setFrom(value)
  }

  const updateTo = (value: string) => {
    value = amountRegExp.test(value) ? value : '0'
    setTo(value)
  }

  const styles = {
    card: css`
      width: 35vw;
      background: linear-gradient(to right bottom, #ff9800, #ed6c02 120%);
      color: white;
      font-size: 16px;
    `,
    cardHeader: css`
      text-align: center;
    `,
    whiteBgColor: css`
      background-color: white;
    `,
    swapButton: css`
      background-color: #4caf50;
      color: white;
      width: 100%;
    `
  }

  return (
    <Card elevation={3} css={styles.card}>
      <CardHeader title="Swap Tokens" css={styles.cardHeader} />
      <CardContent>
        <Stack direction={direction} alignItems="stretch" justifyContent="center" spacing={2}>
          <TextField placeholder="token amount"
                     value={from}
                     css={styles.whiteBgColor}
                     onChange={(e) => updateFrom(e.target.value)}
                     InputProps={{
                       endAdornment: 'ETH'
                     }}
          />
          <p style={{ textAlign: "center", cursor: 'pointer' }}
             onClick={() => setDirection(direction === 'column' ? 'column-reverse' : 'column')}>↓</p>
          <TextField placeholder="token amount"
                     value={to}
                     css={styles.whiteBgColor}
                     onChange={(e) => updateTo(e.target.value)}
                     InputProps={{
                       endAdornment: 'UNI'
                     }}
          />
        </Stack>
        <p>
          {currentExchangeRate()}
        </p>
        <Button css={styles.swapButton} onClick={swap}>
          {isLoading ? 'Loading...' : isSuccess ? 'Success' : 'Send'}
        </Button>
      </CardContent>
    </Card>
  )
}