import { reactLocalStorage } from "reactjs-localstorage";
import { HDIndividualAccount } from "../types";
import { getChainAddressKey } from "./getChainAddressKey";

export const addLocalIndividualAccount = (
  chainId: number,
  externallyOwnedAccountAddress: string,
  existingAccounts: HDIndividualAccount[],
  newAccount: HDIndividualAccount
): void => {
  const newAccountList = [...existingAccounts, newAccount];
  const key = getChainAddressKey(chainId, externallyOwnedAccountAddress);
  const value = JSON.stringify(newAccountList);
  reactLocalStorage.set(key, value);
};
