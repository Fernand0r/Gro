import { useState, useEffect } from "react"
import { useWaitForTransaction }            from "wagmi"
import Input from "@mui/joy/Input"
import ReactJson from "react-json-view"

export const Message = ({ hash }: { hash: string }) => {
  const { data: transaction, isSuccess, isError } = useWaitForTransaction({ hash })
  const [transactionHash, setTransactionHash] = useState('')

  return (
    <div>

      <ReactJson src={transaction} />
    </div>
  )
}