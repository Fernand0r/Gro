import { IconButton }          from "@mui/joy"
import NotificationsIcon       from "@mui/icons-material/Notifications"
import Badge                   from "@mui/joy/Badge"
import Modal                   from "@mui/joy/Modal"
import ModalClose              from "@mui/joy/ModalClose"
import { useReadLocalStorage, useUpdateEffect } from "usehooks-ts"
import { useEffect, useState } from "react"
import { parseJSON }                   from "../utils/common.util"
import { useProvider, useWaitForTransaction } from "wagmi"

export const Notification = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Record<string, any>[]>([])
  const [hashes, setHashes] = useState<`0x${string}`[]>([])
  const transactionsHash = useReadLocalStorage<string>('transactionsHash')
  const provider = useProvider()

  useEffect(() => {
    console.log('transcactionsHash:', transactionsHash)
    setHashes(parseJSON(transactionsHash) ?? [])
  }, [transactionsHash])

  useUpdateEffect(() => {
    if (hashes.length > 0 && messages.length === 0) {
      hashes.forEach(hash => {
        provider.getTransactionReceipt(hash).then((res) => {
          console.log('data:', res)
          setMessages([...messages, { res, isSuccess: true }])
        }).catch((err) => {
          console.log('err:', err)
          setMessages([...messages, { data: err, isError: true }])
        })
        // const { data, isError, isSuccess } = useTransaction({ hash })
      })
      console.log('messages:', messages)
    }
  }, [hashes])

  return (
    <>
      <Badge badgeContent={hashes.length} variant="solid" color="danger">
        <IconButton variant="soft" sx={{ borderRadius: 'xl' }}>
          <NotificationsIcon />
        </IconButton>
      </Badge>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ModalClose />
        {

        }
      </Modal>
    </>
  )
}