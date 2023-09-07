import { reactLocalStorage } from "reactjs-localstorage";
import { IndividualAccount } from "../types";
import { getChainAddressKey } from "./getChainAddressKey";
import { getLocalIndividualAccounts } from "./getLocalIndividualAccounts";

// avoid update records if the account already exists
export const addLocalIndividualAccountToExistingRecord = (
  chainId: number,
  externallyOwnedAccountAddress: string,
  newAccount: IndividualAccount
): void => {
  const existingAccounts = getLocalIndividualAccounts(
    chainId,
    externallyOwnedAccountAddress
  );
  const foundAccount: IndividualAccount | undefined = existingAccounts.find(
    (a) => a.address === newAccount.address
  );
  if (foundAccount === undefined) {
    const newAccountList = [...existingAccounts, newAccount];
    const key = getChainAddressKey(chainId, externallyOwnedAccountAddress);
    const value = JSON.stringify(newAccountList);
    reactLocalStorage.set(key, value);
  }
};
