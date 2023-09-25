import { reactLocalStorage } from "reactjs-localstorage";
import { IndividualAccount } from "../types";
import { getChainAddressKey } from "./getChainAddressKey";

// get individual accounts addresses from local storage
export const getLocalIndividualAccounts = (
  chainId: number,
  externallyOwnedAccountAddress: string
): IndividualAccount[] => {
 const key = getChainAddressKey(chainId, externallyOwnedAccountAddress);
  const value = reactLocalStorage.get(key);
  const accounts = value ? JSON.parse(value as string) : [];
  return accounts;
};
