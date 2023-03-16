import { ConnectKitButton }       from 'connectkit'
import { useAccount } from 'wagmi'
import { Account }                from './components'
import { Container }              from '@mui/material'

export function App() {
  const { isConnected } = useAccount()
  return (
    <Container>
      <h1>Gro</h1>
      <ConnectKitButton />
      { isConnected && <Account /> }
    </Container>
  )
}
