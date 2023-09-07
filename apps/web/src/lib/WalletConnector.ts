import Onboard from "@sovryn/onboard-core";
import { Asset, BasePath } from "@sovryn/onboard-hw-common";
import injectedModule from "@sovryn/onboard-injected";
import ledgerModule from "@sovryn/onboard-ledger";

const basePaths: BasePath[] = [
  { label: "RSK Mainnet", value: "m/44'/137'/0'/0" },
  { label: "Ethereum Mainnet", value: "m/44'/60'/0'/0" },
];
const assets: Asset[] = [{ label: "RBTC" }, { label: "ETH" }];

const injected = injectedModule();
const ledger = ledgerModule({
  basePaths,
  assets,
});
const chains = [
  {
    id: "0x1f",
    rpcUrl: "https://public-node.testnet.rsk.co",
    label: "RSK Testnet",
    token: "tRBTC",
    blockExplorerUrl: "https://explorer.testnet.rsk.co",
  },
];

export const onboard = Onboard({
  wallets: [injected, ledger],
  chains,
});
