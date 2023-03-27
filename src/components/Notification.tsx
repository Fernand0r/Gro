import { IconButton }                           from "@mui/joy"
import NotificationsIcon                        from "@mui/icons-material/Notifications"
import Box                                      from '@mui/joy/Box'
import Badge                                    from "@mui/joy/Badge"
import Modal                                    from "@mui/joy/Modal"
import ModalDialog                              from "@mui/joy/ModalDialog"
import { useReadLocalStorage, useUpdateEffect } from "usehooks-ts"
import { useEffect, useRef, useState }          from "react"
import { parseJSON }                            from "../utils/common.util"
import { useProvider }                          from "wagmi"
import ReactJson                                from 'react-json-view'

export const Notification = () => {
  const notificationRef = useRef(null)
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
          setMessages([...messages, { data: res, isSuccess: true }])
        }).catch((err) => {
          console.log('err:', err)
          setMessages([...messages, { data: err, isError: true }])
        })
      })
      console.log('messages:', messages)
    }
  }, [hashes])

  return (
    <Box ref={ notificationRef } sx={{
      position: 'relative',
      overflow: 'visible!important'
    }}>
      <Badge badgeContent={ hashes.length } variant="solid" color="danger">
        <IconButton variant="soft" sx={{ borderRadius: 'xl' }} onClick={ () => setOpen(!open) }>
          <NotificationsIcon />
        </IconButton>
      </Badge>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        container={() => notificationRef.current}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '365px',
          left: '-600px'
        }}
      >
        <ModalDialog
          variant="plain"
          sx={{
            maxHeight: "fit-content",
            bgcolor: 'white'
          }}
        >
          {
            messages.map((message, index) => {
              return (
                <Box key={index} sx={{
                  width: '600px',
                  height: '600px',
                  overflow: 'auto',
                  bgcolor: 'white',
                  position: 'relative'
                }}>
                  <ReactJson src={message.data} />
                </Box>
              )
            })
          }
        </ModalDialog>
      </Modal>
    </Box>
  )
}