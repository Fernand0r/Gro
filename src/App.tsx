import { ConnectKitButton } from 'connectkit'
import { useAccount }       from 'wagmi'
import { Account }          from './components'
import { Container }        from '@mui/material'
import { SendTransaction }  from "./components/SendTransaction"
import { SwapTokens }       from "./components/SwapTokens"

export function App() {
  const { isConnected } = useAccount()
  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      background: 'radial-gradient(100% 100% at 50% 0%, rgba(255, 184, 226, 0.51) 0%, rgba(255, 255, 255, 0) 100%), rgb(255, 255, 255)'
    }}>
      <h1>Gro</h1>
      <ConnectKitButton />
      { isConnected && <Account /> }
      { isConnected && <SendTransaction /> }
      { isConnected && <SwapTokens /> }
    </Container>
  )
}
