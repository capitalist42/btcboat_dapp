import { useState, useLayoutEffect } from "react";
import { IndividualAccount } from "../types";
import { individualAccountStore } from "../stores/IndividualAccountStore";

export interface UseIndividualAccountHook {
  accountState: { data: IndividualAccount[]; accountCount: number };
  openNewAccount: (
    chainId: number,
    externallyOwnedAccountAddress: string
  ) => void;
  loadAccountsFromLocalStorage: (
    chainId: number,
    externallyOwnedAccountAddress: string
  ) => void;
}
export const useIndividualAccountHook = (): UseIndividualAccountHook => {
  console.debug("useIndividualAccountHook: init ...");
  const [accountState, setAccountState] = useState(
    individualAccountStore.initialState
  );

  useLayoutEffect(() => {
    const subscription = individualAccountStore.subscribe((store) => {
      console.debug("useIndividualAccountHook: store ...", store);
      console.debug("should update accounts ...");
      setAccountState(
        store as {
          data: IndividualAccount[];
          accountCount: number;
        }
      );
    });
    individualAccountStore.init();
    return () => subscription.unsubscribe();
  }, []);

  return {
    accountState,
    openNewAccount: individualAccountStore.openNewAccount,
    loadAccountsFromLocalStorage:
      individualAccountStore.loadAccountsFromLocalStorage,
  };
};
