import { useAccount, useBalance, useEnsName } from 'wagmi'
import { Card, CardContent, CardHeader } from '@mui/material'
import Grid2                                  from "@mui/material/Unstable_Grid2"

export function Account() {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data } = useBalance({
    address
  })

  return (
    <Grid2 >
      <Card elevation={3} sx={{
        width: '25vw',
        background: 'linear-gradient(to right bottom, #007FFF, #0059B2 120%)',
        color: 'white',
        fontSize: '16px'
      }}>
        <CardHeader title='Account Info' sx={{
          textAlign: 'center'
        }} />
        <CardContent>
          <p>Address: { address }</p>
          <p>Balance: { data && data.formatted } ETH</p>
        </CardContent>
      </Card>
    </Grid2>
  )
}
