import { useEffect, useState } from "react"
import { useProvider }         from "wagmi"
import { formatUnits }         from "ethers/lib/utils"

export const useGasPrice = (units: string = 'gwei') => {
  const [gasPrice, setGasPrice] = useState('0')
  const provider = useProvider()

  useEffect(() => {
    provider.getGasPrice().then((code) => {
      setGasPrice((formatUnits(code, units)))
    })
  }, [provider, gasPrice])
  return gasPrice
}
