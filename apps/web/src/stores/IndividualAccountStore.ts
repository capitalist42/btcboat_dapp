import { Observer, Subject } from "rxjs";
import { providers } from "ethers";
import {
  RelayClient,
  UserDefinedDeployRequest,
  getSmartWalletAddress,
} from "@rsksmart/rif-relay-client";
import { IndividualAccount } from "../types";
// import { getChainAddressKey } from "../utils/getChainAddressKey";
import { saveIndividualAccountsToLocalStorage } from "../utils/saveIndividualAccountsToLocalStorage";
import { getLocalIndividualAccounts } from "../utils/getLocalIndividualAccounts";
import { isAddressContainCode } from "../utils/isAddressContainCode";

const subject = new Subject();

const initialState: { data: IndividualAccount[]; accountCount: number } = {
  data: [],
  accountCount: 0,
};

let state = initialState;

export const individualAccountStore = {
  init: () => subject.next(state),
  initialState: initialState,
  subscribe: (
    setState:
      | Partial<Observer<unknown>>
      | ((value: unknown) => void)
      | undefined
  ) => subject.subscribe(setState),
  loadAccountsFromLocalStorage: async (
    chainId: number,
    externallyOwnedAccountAddress: string
  ) => {
    const accounts = getLocalIndividualAccounts(
      chainId,
      externallyOwnedAccountAddress
    );
    state = {
      ...state,
      data: accounts,
      accountCount: accounts.length,
    };
    subject.next(state);
  },
  openNewAccount: async (
    chainId: number,
    web3Provider: providers.Web3Provider,
    externallyOwnedAccountAddress: string
  ) => {
    // limit to only open one account ...
    const index = 0;
    const address = await getSmartWalletAddress(
      externallyOwnedAccountAddress,
      index
    );
    const isDeployed = await isAddressContainCode(
      web3Provider,
      address
    );
    const newAccount = { index, address, externallyOwnedAccountAddress, isDeployed };
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
  },
  deployIndividualAccount: async (
    chainId: number,
    provider: providers.Web3Provider,
    client: RelayClient,
    externallyOwnedAccountAddress: string
  ) => {
    const index = 0;
    const dllrTokenAddressTestnet =
      "0x007b3aa69a846cb1f76b60b3088230a52d2a83ac";
  
    const relayTx: UserDefinedDeployRequest = {
      request: {
        from: externallyOwnedAccountAddress,
        tokenAmount: 0,
        tokenContract: dllrTokenAddressTestnet,
        index: index,
      },
    };

    const tx = await client.relayTransaction(relayTx);
    const receipt = await provider.waitForTransaction(tx.hash!, 1, 120);
    if (receipt === null) {
      throw new Error("deployIndividualAccount Transaction failed");
    }
    const isDeployed = receipt.status === 1;
    const address = state.data[0].address;
    const account = { index, address, externallyOwnedAccountAddress, isDeployed };
    saveIndividualAccountsToLocalStorage(
      chainId,
      externallyOwnedAccountAddress,
      [account]
    );
    state = {
      ...state,
      data: [account]
    };

    subject.next(state);
  },
};
