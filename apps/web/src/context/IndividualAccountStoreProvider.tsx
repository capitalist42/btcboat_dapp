import React, { FC, PropsWithChildren, useLayoutEffect } from "react";

import { individualAccountStore } from "../stores/IndividualAccountStore";
import { useOnboardWalletHook } from "../hooks/useOnboardWalletHook";
import { useIndividualAccountHook } from "../hooks/useIndividualAccountHook";

export const IndividualAccountStoreProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { firstAccountAddress } = useOnboardWalletHook();
  const { accountState } = useIndividualAccountHook();
  console.debug(
    "IndividualAccountStoreProvider firstAccountAddress",
    firstAccountAddress
  );
  console.debug("IndividualAccountStoreProvider accountState", accountState);

  useLayoutEffect(() => {
    const chainId = 31;
    if (firstAccountAddress) {
      console.debug(
        "IndividualAccountStoreProvider individualAccountStore.loadAccountsFromLocalStorage"
      );
      individualAccountStore.loadAccountsFromLocalStorage(
        chainId,
        firstAccountAddress as string
      );
    }
  }, [firstAccountAddress]);

  return <>{children}</>;
};
