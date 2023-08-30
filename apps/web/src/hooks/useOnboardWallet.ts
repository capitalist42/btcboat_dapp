import { useCallback, useState } from "react";
import { onboard } from "../lib/connector";

export const useOnboardWallet = () => {
    // const [pending, setPending] = useState(false);
    // const [wallets, setWallets] = useState<WalletState[]>(
    //     onboard.state.get().wallets,
    //   );

    const connectWallet = useCallback(async () => {
        console.debug("connectWallet...")
        await onboard.connectWallet();
    }, []);

    const disconnectWallet = useCallback(async () => {
        await onboard.disconnectWallet();
    } , []);


    return {
        connectWallet,
        disconnectWallet
    }
};