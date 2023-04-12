import { useContract, useProvider }                         from "wagmi"
import { FeeAmount, QuoterV2ContractAddress, TokenAddress } from "@/constants/uniswap"
import { quoterV2ABI }                                      from "@/generated"
import { formatEther, parseEther }                          from "ethers/lib/utils"
import { useCallback, useState } from "react"

// Get a quote without gas fees
export const useUniSwapQuote = (): [string, (isWeth2Uni: boolean, tokenAmountIn: string) => void] => {
  const [quote, setQuote] = useState<string>('0')
  const uni_contract = useContract({
    address: QuoterV2ContractAddress,
    abi: quoterV2ABI,
    signerOrProvider: useProvider()
  })

  const queryQuote = useCallback((isWeth2Uni: boolean, tokenAmountIn: string): void => {
    uni_contract?.callStatic.quoteExactInputSingle({
      tokenIn: TokenAddress[isWeth2Uni ? 'WETH' : 'UNI'],
      tokenOut: TokenAddress[isWeth2Uni ? 'UNI' : 'WETH'],
      amountIn: parseEther(tokenAmountIn),
      fee: FeeAmount.MEDIUM,
      sqrtPriceLimitX96: parseEther('0')
    }).then((response: any) => {
      setQuote(formatEther(response?.amountOut))
    }).catch((error: Error) => {
      console.error(error)
      setQuote('0')
    })
  }, [uni_contract, quote])

  return [quote, queryQuote]
}
