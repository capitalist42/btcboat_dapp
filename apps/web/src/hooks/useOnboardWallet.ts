import { useCallback, useEffect, useState } from "react";
import { onboard } from "../lib/connector";
import { WalletState } from "@sovryn/onboard-core";

export interface UseOnboardWalletHook {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  pending: boolean;
}

export const useOnboardWallet = (): UseOnboardWalletHook => {
  const [pending, setPending] = useState(false);
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
    const sub = connectWallet
      .asObservable()
      .subscribe(({ isProgress }) => setPending(isProgress));
    return () => sub.unsubscribe();
  }, [connectWallet]);

  useEffect(() => {
    const sub = onboard.state
      .select("wallets")
      .pipe(startWith(onboard.state.get().wallets))
      .subscribe(setWallets);
    return () => sub.unsubscribe();
  }, []);

  const firstAccount = useMemo(() => {
    wallets[0]?.accounts[0]?.address;
  }, [wallets]);

  const getWallet = useCallback(
    (index: number) => {
      wallets[index];
    },
    [wallets]
  );

  return {
    connectWallet,
    disconnectWallet,
    pending,
    account,
  };
};
