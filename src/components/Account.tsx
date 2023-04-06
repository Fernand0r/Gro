import { useAccount, useBalance, useContractRead, useEnsName, useProvider } from 'wagmi'
import { Card, CardContent, CardHeader }                                    from '@mui/material'
import { formatEther, formatUnits }                                         from "ethers/lib/utils"
import { TokenAddressesMapping }                                            from "../types/tokenAddresses"

export function Account() {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data } = useBalance({
    address
  })
  const { data: uniswap_balance } = useBalance({
    address,
    token: TokenAddressesMapping.UniSwap
  })

  return (
    <Card elevation={3} sx={{
      width: '35vw',
      background: 'linear-gradient(to right bottom, #007FFF, #0059B2 120%)',
      color: 'white',
      fontSize: '16px'
    }}>
      <CardHeader title="Account Info" sx={{
        textAlign: 'center'
      }} />
      <CardContent>
        <p>Address: {address}</p>
        <p>ETH Balance: {data?.formatted} ETH</p>
        <p>Uniswap Balance: {uniswap_balance?.formatted} Uni</p>
      </CardContent>
    </Card>
  )
}
