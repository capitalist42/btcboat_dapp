import { Subject } from "rxjs";
import { getSmartWalletAddress } from "@rsksmart/rif-relay-client";
import { IndividualAccount } from "../types";
// import { getChainAddressKey } from "../utils/getChainAddressKey";
import { saveIndividualAccountsToLocalStorage } from "../utils/saveIndividualAccountsToLocalStorage";
import { getLocalIndividualAccounts } from "../utils/getLocalIndividualAccounts";

const subject = new Subject();

const initialState: { data: IndividualAccount[]; accountCount: number } = {
  data: [],
  accountCount: 0,
};

let state = initialState;

export const individualAccountStore = {
  init: () => subject.next(state),
  initialState: initialState,
  subscribe: (setState: (value: unknown) => void) =>
    subject.subscribe(setState),
  loadAccountsFromLocalStorage: async (
    chainId: number,
    externallyOwnedAccountAddress: string
  ) => {
    console.debug("loadAccountsFromLocalStorage...");
    const accounts = getLocalIndividualAccounts(
      chainId,
      externallyOwnedAccountAddress
    );
    console.debug("accounts: ", accounts);
    state = {
      ...state,
      data: accounts,
      accountCount: accounts.length,
    };
    subject.next(state);
  },
  openNewAccount: async (
    chainId: number,
    externallyOwnedAccountAddress: string
  ) => {
    console.debug("openNewAccount...");
    // limit to only open one account ...
    const index = 0;
    console.debug("getSmartWalletAddress...");
    try {

    
    const address = await getSmartWalletAddress(
        externallyOwnedAccountAddress,
        index
      );
      console.debug("address", address);
      const newAccount = { index, address, externallyOwnedAccountAddress };
      if (state.data.length === 0) {
        // dev: should extract out to somewhere?; subscribe to data change and update localstorage
        saveIndividualAccountsToLocalStorage(
          chainId,
          externallyOwnedAccountAddress,
          [newAccount]
        );
        state = {
          ...state,
          data: [newAccount],
          accountCount: state.accountCount + 1,
        };
      } else {
        console.error("only limited to one account...");
      }

      subject.next(state);
    } catch (e) {
      console.log("IndividualAccountStore.openNewAccount error: ");
      console.debug(e);
    }
  },
};
