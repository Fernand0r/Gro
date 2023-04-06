import { IconButton, List }            from "@mui/joy"
import NotificationsIcon               from "@mui/icons-material/Notifications"
import Box                             from '@mui/joy/Box'
import Badge                           from "@mui/joy/Badge"
import Modal                           from "@mui/joy/Modal"
import ModalDialog                     from "@mui/joy/ModalDialog"
import { useReadLocalStorage }         from "usehooks-ts"
import { useEffect, useRef, useState } from "react"
import { parseJSON }                   from "../utils/common.util"
import { Message }                     from "./Message"

export const Notification = () => {
  const notificationRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [hashes, setHashes] = useState<`0x${string}`[]>([])
  const transactionsHash = useReadLocalStorage<string>('transactionsHash')

  useEffect(() => {
    console.log('transcactionsHash:', transactionsHash)
    setHashes(parseJSON(transactionsHash) ?? [])
  }, [transactionsHash])

  return (
    <Box ref={notificationRef} sx={{
      position: 'relative',
      overflow: 'visible!important'
    }}>
      <Badge badgeContent={hashes.length} variant="solid" color="danger">
        <IconButton variant="soft" sx={{ borderRadius: 'xl' }} onClick={() => {
          if (hashes.length === 0) return
          setOpen(!open)
        }}>
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
            height: "600px",
            maxHeight: "fit-content",
            bgcolor: 'white',
            overflow: 'auto'
          }}
        >
          <List>
            {
              hashes.map((hash) => {
                return (<Box key={hash} sx={{
                  width: "600px",
                  bgcolor: 'white',
                  position: 'relative'
                }}>
                  <Message key={hash} hash={hash} />
                </Box>)
              })
            }
          </List>
        </ModalDialog>
      </Modal>
    </Box>
  )
}