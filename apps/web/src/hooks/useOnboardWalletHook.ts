import {providers} from 'ethers';
import { useCallback, useEffect, useState, useMemo } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { WalletState } from "@sovryn/onboard-core";
import { onboard } from "../lib/WalletConnector";

const CONNECTED_WALLET_LABLE = "heavens-door-wallet-label";

export interface UseOnboardWalletHook {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  wallets: WalletState[];
  firstAccountAddress: string | undefined;
  web3Provider: providers.Web3Provider | undefined;
}

export const useOnboardWalletHook = (): UseOnboardWalletHook => {
  const [wallets, setWallets] = useState<WalletState[]>(
    onboard.state.get().wallets
  );

  const connectWallet = useCallback(async () => {
    console.debug("connectWallet...");
    await onboard.connectWallet();
  }, []);

  const disconnectWallet = useCallback(async () => {
    console.debug("disconnectWallet...");
    await onboard.disconnectWallet();
  }, []);

  useEffect(() => {
    const subscription = onboard.state.select("wallets").subscribe(setWallets);
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = onboard.state
      .select("wallets")
      .subscribe((wallets) => {
        if (wallets.length > 0) {
          const { label } = wallets[0];
          reactLocalStorage.set(CONNECTED_WALLET_LABLE, label);
        } else {
          reactLocalStorage.remove(CONNECTED_WALLET_LABLE);
        }
      });

    return () => subscription.unsubscribe();
  }, []);


  const firstAccountAddress = useMemo(
    () => wallets[0]?.accounts[0]?.address,
    [wallets]
  );

  const web3Provider = wallets[0]?.provider ? new providers.Web3Provider(wallets[0]?.provider) : undefined;



  // const firstAccount = useMemo(() => {
  //   wallets[0]?.accounts[0]?.address;
  // }, [wallets]);

  // const getWallet = useCallback(
  //   (index: number) => {
  //     wallets[index];
  //   },
  //   [wallets]
  // );

  return {
    connectWallet,
    disconnectWallet,
    wallets,
    firstAccountAddress,
    web3Provider
  };
};
