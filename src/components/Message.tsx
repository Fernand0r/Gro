import { useWaitForTransaction } from "wagmi"
import ListItem                  from "@mui/joy/ListItem"
import ListItemContent           from "@mui/joy/ListItemContent"
import ListItemDecorator         from "@mui/joy/ListItemDecorator"
import ReactJson                 from "react-json-view"
import ErrorOutlineIcon          from '@mui/icons-material/ErrorOutline'
import CheckCircleOutlineIcon    from '@mui/icons-material/CheckCircleOutline'
import HourglassTopIcon          from '@mui/icons-material/HourglassTop'

export const Message = ({ hash }: { hash: `0x${string}` }) => {
  const { data: transaction_receipt, isSuccess, isError, isLoading } = useWaitForTransaction({ hash })
  return (
    <ListItem>
      <ListItemDecorator>
        {
          isError ? <ErrorOutlineIcon color="error" /> : isSuccess ?
            <CheckCircleOutlineIcon color="primary" /> : isLoading ? <HourglassTopIcon color="secondary" /> : null
        }
      </ListItemDecorator>
      <ListItemContent>
        <ReactJson name={isSuccess ? 'success' : isError ? 'failed' : isLoading ? 'processing' : ''} collapsed
                   enableClipboard={false} key={hash} src={ isLoading ? { hash } : transaction_receipt } />
      </ListItemContent>
    </ListItem>
  )
}