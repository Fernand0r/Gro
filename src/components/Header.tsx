import * as React           from 'react'
import { ColorPaletteProp } from '@mui/joy/styles'
import Badge                from '@mui/joy/Badge'
import Box                  from '@mui/joy/Box'
import IconButton           from '@mui/joy/IconButton'
import Sheet                from '@mui/joy/Sheet'
import NotificationsIcon    from '@mui/icons-material/Notifications'
import { ConnectKitButton } from "connectkit"
import { Notification }     from "./Notification"

export default function Header() {
  const [color, setColor] = React.useState<ColorPaletteProp>('primary')
  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        p: 2,
        // mx: -3,
        // my: 3,
        // borderRadius: { xs: 0, sm: 'xs' },
        minWidth: 'min-content',
        ...(color !== 'warning' && {
          background: (theme) =>
            `linear-gradient(to top, ${theme.vars.palette[color][600]}, ${theme.vars.palette[color][500]})`
        })
      }}
    >
      <IconButton
        variant="soft"
        size="sm"
        onClick={() => {
          const colors: ColorPaletteProp[] = [
            'primary',
            'neutral',
            'danger',
            'info',
            'success',
            'warning'
          ]
          const nextColor = colors.indexOf(color)
          setColor(colors[nextColor + 1] ?? colors[0])
        }}
        sx={{ borderRadius: '50%' }}
      >
        <img alt="" src="https://wcp.57blocks.com/57_favicon.ico" />
      </IconButton>
      <Box sx={{ flex: 1, display: 'flex', gap: 1, px: 2 }}>
        <ConnectKitButton />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Notification />
        </Box>
      </Box>
    </Sheet>
  )
}
