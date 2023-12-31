import { useState, useLayoutEffect } from "react";
import { providers } from "ethers";
import { IndividualAccount } from "../types";
import { individualAccountStore } from "../stores/IndividualAccountStore";
import { RelayClient } from "@rsksmart/rif-relay-client";

export interface UseIndividualAccountHook {
  accountState: { data: IndividualAccount[]; accountCount: number };
  individualAccountDeploymentLoading: boolean;
  deployIndividualAccount: (
    chainId: number,
    provider: providers.Web3Provider,
    client: RelayClient,
    externallyOwnedAccountAddress: string
  ) => Promise<void>;
  openNewAccount: (
    chainId: number,
    provider: providers.Web3Provider,
    externallyOwnedAccountAddress: string
  ) => void;
  loadAccountsFromLocalStorage: (
    chainId: number,
    externallyOwnedAccountAddress: string
  ) => void;
}
export const useIndividualAccountHook = (): UseIndividualAccountHook => {
  const [accountState, setAccountState] = useState(
    individualAccountStore.initialState
  );

  const [
    individualAccountDeploymentLoading,
    setIndividualAccountDeploymentLoading,
  ] = useState(false);

  useLayoutEffect(() => {
    const subscription = individualAccountStore.subscribe((store) => {
      setAccountState(
        store as {
          data: IndividualAccount[];
          accountCount: number;
          isDeployed: boolean;
        }
      );
    });
    individualAccountStore.init();
    return () => subscription.unsubscribe();
  }, []);

  const deployIndividualAccount = async(
    chainId: number,
    provider: providers.Web3Provider,
    client: RelayClient,
    externallyOwnedAccountAddress: string
  ) => {
    console.debug("deployIndividualAccount....");
    setIndividualAccountDeploymentLoading(true);
    await individualAccountStore.deployIndividualAccount(
      chainId,
      provider,
      client,
      externallyOwnedAccountAddress
    );
  };

  return {
    accountState,
    individualAccountDeploymentLoading,
    deployIndividualAccount: deployIndividualAccount,
    openNewAccount: individualAccountStore.openNewAccount,
    loadAccountsFromLocalStorage:
      individualAccountStore.loadAccountsFromLocalStorage,
  };
};
