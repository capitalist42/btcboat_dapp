import { Observer, Subject } from "rxjs";
import { getSmartWalletAddress } from "@rsksmart/rif-relay-client";
import { HDIndividualAccount } from "../types";
// import { getChainAddressKey } from "../utils/getChainAddressKey";
import { addLocalIndividualAccountToExistingRecord } from "../utils/saveLocalIndividualAccountToExistingRecord";
import { getLocalIndividualAccounts } from "../utils/getLocalIndividualAccounts";

const subject = new Subject();

const initialState: { data: HDIndividualAccount[]; accountCount: number } = {
  data: [],
  accountCount: 0,
};

let state = initialState;

export const hdIndividualAccountStore = {
  init: () => subject.next(state),
  initialState: initialState,
  subscribe: (
    setState:
      | Partial<Observer<unknown>>
      | ((value: unknown) => void)
      | undefined
  ) => subject.subscribe(setState),
  loadAccountsFromLocalStorage: async (chainId: number, externallyOwnedAccountAddress: string) => {
    console.debug("loadAccountsFromLocalStorage...")
    const accounts = getLocalIndividualAccounts(chainId, externallyOwnedAccountAddress);
    console.debug("accounts: ", accounts)
    state = {
      ...state,
      data: accounts
    };
    subject.next(state);
  },
  openNewAccount: async (
    chainId: number,
    externallyOwnedAccountAddress: string
  ) => {
    // limit to only open one account ...
    // const key = getChainAddressKey(chainId, externallyOwnedAccountAddress);
    const index = 0;
    console.debug("getSmartWalletAddress...");
    const address = await getSmartWalletAddress(
      externallyOwnedAccountAddress,
      index
    );
    console.debug("address", address);
    console.debug("saving to localstore...")
    await addLocalIndividualAccountToExistingRecord(chainId, externallyOwnedAccountAddress, {index, address, externallyOwnedAccountAddress});
    if (state.data.length === 0) {
      state = {
        ...state,
        data: [{index, address, externallyOwnedAccountAddress}],
        accountCount: state.accountCount + 1,
      };
    } else {
      console.error("only limited to one account...")
    }
    
    subject.next(state);
  },
};
