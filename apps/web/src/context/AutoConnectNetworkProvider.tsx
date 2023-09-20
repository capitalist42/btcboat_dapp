import React, { useEffect } from "react";
import type { FC, PropsWithChildren } from "react";
import { onboard } from "../lib/WalletConnector";
import { reactLocalStorage } from "reactjs-localstorage";

const CONNECTED_WALLET_LABLE = "btcboat-wallet-label";

export const AutoConnectNetworkProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  useEffect(() => {
    const selectedWalletType = reactLocalStorage.get(CONNECTED_WALLET_LABLE);
    if (selectedWalletType) {
      onboard.connectWallet(selectedWalletType as string);
    }
  }, []);
  return <>{children}</>;
};
