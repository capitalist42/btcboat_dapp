import { reactLocalStorage } from "reactjs-localstorage";
import { HDIndividualAccount } from "../types";
import { getChainAddressKey } from "./getChainAddressKey";
import { getLocalIndividualAccounts } from "./getLocalIndividualAccounts";

export const addLocalIndividualAccountToExistingRecord = (
  chainId: number,
  externallyOwnedAccountAddress: string,
  newAccount: HDIndividualAccount
): void => {
  const existingAccounts = getLocalIndividualAccounts(chainId, externallyOwnedAccountAddress);
  const newAccountList = [...existingAccounts, newAccount];
  const key = getChainAddressKey(chainId, externallyOwnedAccountAddress);
  const value = JSON.stringify(newAccountList);
  reactLocalStorage.set(key, value);
};
