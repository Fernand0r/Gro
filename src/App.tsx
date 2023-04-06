import { goerli, useAccount, useNetwork } from 'wagmi'
import { Account }                        from './components'
import { Box, Container }         from '@mui/material'
import { CssBaseline }            from "@mui/material"
import { SendTransaction }        from "./components/SendTransaction"
import { SwapTokens }             from "./components/SwapTokens"
import { Deposit }                from './components/Deposit'
import Header                     from "./components/Header"

export function App() {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const isConnectedToGoerli = chain?.id === goerli.id
  return (
    <Box sx={{
      background: 'radial-gradient(100% 100% at 50% 0%, rgba(255, 184, 226, 0.51) 0%, rgba(255, 255, 255, 0) 100%), rgb(255, 255, 255)'
    }}>
      <CssBaseline />
      <Header />
      <Container sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '2rem',
        p: 3
      }}>
        {isConnectedToGoerli && <Account />}
        {isConnectedToGoerli && <SendTransaction />}
        {isConnectedToGoerli && <SwapTokens />}
        {isConnected && <Deposit />}
      </Container>
    </Box>
  )
}
