import { reactLocalStorage } from "reactjs-localstorage";
import { IndividualAccount } from "../types";
import { getChainAddressKey } from "./getChainAddressKey";

export const saveIndividualAccountsToLocalStorage = (
  chainId: number,
  externallyOwnedAccountAddress: string,
  accounts: IndividualAccount[]
): void => {
  const key = getChainAddressKey(chainId, externallyOwnedAccountAddress);
  const value = JSON.stringify(accounts);
  reactLocalStorage.set(key, value);
};
