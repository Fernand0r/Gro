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
    }}>
      <h1>Gro</h1>
      <ConnectKitButton />
      { isConnected && <Account /> }
      { isConnected && <SendTransaction /> }
      { isConnected && <SwapTokens /> }
    </Container>
  )
}
