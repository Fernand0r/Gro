import { Deposit } from "@/components";
import { client } from "@/wagmi";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";

export default () => {
  return (<WagmiConfig client={client}>
    <ConnectKitProvider>
      <Deposit />
    </ConnectKitProvider>
  </WagmiConfig>);
}