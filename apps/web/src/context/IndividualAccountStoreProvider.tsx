import React, { FC, PropsWithChildren, useLayoutEffect } from "react";

import { individualAccountStore } from "../stores/IndividualAccountStore";
import { useOnboardWalletHook } from "../hooks/useOnboardWalletHook";
import { useIndividualAccountHook } from "../hooks/useIndividualAccountHook";

export const IndividualAccountStoreProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { firstAccountAddress } = useOnboardWalletHook();
  const { accountState } = useIndividualAccountHook();

  useLayoutEffect(() => {
    const chainId = 31;
    if (firstAccountAddress) {
      individualAccountStore.loadAccountsFromLocalStorage(
        chainId,
        firstAccountAddress as string
      );
    }
  }, [firstAccountAddress]);

  return <>{children}</>;
};
