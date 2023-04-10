import * as React from "react"
import { ColorPaletteProp, styled } from "@mui/joy/styles"
import Box from "@mui/joy/Box"
import IconButton from "@mui/joy/IconButton"
import Sheet from "@mui/joy/Sheet"
import { ConnectKitButton } from "connectkit"
import { Notification } from "./Notification"
import { useAccount } from "wagmi"
import { walletAvatarsMapping } from "../constants/walletAvatars"

export default function Header() {
  const [color, setColor] = React.useState<ColorPaletteProp>("primary")
  const { connector } = useAccount()

  const StyledButton = styled("button")`
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 8px;
    padding: 10px 16px;
    color: #3d3c3c;
    background: #e7e4e7;
    font-size: 16px;
    font-weight: 500;
    border-radius: 10rem;
    border: none;
    transition: 200ms ease;

    &:hover {
      transform: filter(brightness(1.1));
      box-shadow: 0 6px 40px -6px #1a88f8;
    }
  `

  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        p: 2,
        // mx: -3,
        // my: 3,
        // borderRadius: { xs: 0, sm: 'xs' },
        minWidth: "min-content",
        ...(color !== "warning" && {
          background: theme =>
            `linear-gradient(to top, ${theme.vars.palette[color][600]}, ${theme.vars.palette[color][500]})`,
        }),
      }}
    >
      <IconButton
        variant="soft"
        size="sm"
        onClick={() => {
          const colors: ColorPaletteProp[] = [
            "primary",
            "neutral",
            "danger",
            "info",
            "success",
            "warning",
          ]
          const nextColor = colors.indexOf(color)
          setColor(colors[nextColor + 1] ?? colors[0])
        }}
        sx={{ borderRadius: "50%" }}
      >
        <img alt="" src="https://wcp.57blocks.com/57_favicon.ico" />
      </IconButton>
      <Box sx={{ flex: 1, display: "flex", gap: 1, px: 2 }}>
        <ConnectKitButton.Custom>
          {({ isConnected, show, truncatedAddress, ensName }) => {
            return (
              <StyledButton onClick={show}>
                {connector && (
                  <img
                    width="22"
                    src={walletAvatarsMapping[connector!.name]}
                    alt=""
                  />
                )}
                {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
              </StyledButton>
            )
          }}
        </ConnectKitButton.Custom>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "row-reverse", flexShrink: 0 }}
      >
        <Notification />
      </Box>
    </Sheet>
  )
}
