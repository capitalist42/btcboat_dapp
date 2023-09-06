import React, {
  FC,
  PropsWithChildren,
  useEffect,
  // useState,
} from "react";

// import { hdIndividualAccountStore } from "../stores/HDIndividualAccountStore";
import { useOnboardWalletHook } from "../hooks/useOnboardWalletHook";
import { getLocalIndividualAccounts } from "../utils/getLocalIndividualAccounts";

export const HDIndividualAccountStoreProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { firstAccountAddress } = useOnboardWalletHook();
  // const [_state, setState] = useState(hdIndividualAccountStore.initialState);
  useEffect(() => {
    console.debug("useEffect");
    // console.debug("hdIndividualAccountStore.subscribe");
    // const subscription = hdIndividualAccountStore.subscribe(setState);
    // console.debug("hdIndividualAccountStore.init");
    // hdIndividualAccountStore.init();

    // return () => {
    //   console.debug("hdIndividualAccountStore unsubscribe");
    //   subscription.unsubscribe();
    // };
  }, []);

  useEffect(() => {
    const chainId = 31;
    if (firstAccountAddress) {
      const accounts = getLocalIndividualAccounts(
        chainId,
        firstAccountAddress as string
      );
      console.log("accounts", accounts);
    }
  }, [firstAccountAddress]);

  return <>{children}</>;
};
