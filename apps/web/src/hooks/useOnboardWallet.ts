import { useCallback, useState } from "react";
import { onboard } from "../lib/connector";


export interface UseOnboardWalletHook {
    connectWallet: () => Promise<void>;
    disconnectWallet: () => Promise<void>;
}

export const useOnboardWallet = (): UseOnboardWalletHook => {
    // const [pending, setPending] = useState(false);
    // const [wallets, setWallets] = useState<WalletState[]>(
    //     onboard.state.get().wallets,
    //   );

    const connectWallet = useCallback(async () => {
        console.debug("connectWallet...");
        await onboard.connectWallet();
    }, []);

    const disconnectWallet = useCallback(async () => {
        console.debug("disconnectWallet...");
        await onboard.disconnectWallet();
    } , []);


    return {
        connectWallet,
        disconnectWallet
    }
};