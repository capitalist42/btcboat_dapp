// import {Observer } from 'rxjs';
import { useState, useLayoutEffect, useEffect } from "react";
import { IndividualAccount } from "../types";
import { individualAccountStore } from "../stores/IndividualAccountStore"
// import { saveIndividualAccountsToLocalStorage } from "../utils/saveIndividualAccountToLocalStorage";
export interface UseIndividualAccountHook {
    accountState: {data: IndividualAccount[], accountCount: number},
    // init: () => void,
    openNewAccount: (chainId: number, externallyOwnedAccountAddress: string) => void,
    loadAccountsFromLocalStorage: (chainId: number, externallyOwnedAccountAddress: string) => void,
    // subscribe: (setState: Partial<Observer<unknown>> | ((value: unknown) => void) | undefined) => void,
}
export const useIndividualAccountHook = (): UseIndividualAccountHook => {
    type SetAccountStateAction = {
        data: IndividualAccount[],
        accountCount: number
    }

    console.debug("useIndividualAccountHook: init ...");
    const [accountState, setAccountState] = useState(individualAccountStore.initialState);


    // const syncWithLocalStorage = (chainId: number, externallyOwnedAccountAddress: string) => {
    //     addLocalIndividualAccountToExistingRecord()
    // }

    useLayoutEffect(() => {
        const subscription = individualAccountStore.subscribe((store) => {
            console.debug("useIndividualAccountHook: store ...", store)
            console.debug("should update accounts ...")
            setAccountState(store as SetAccountStateAction);
    });
        individualAccountStore.init();
        return () => subscription.unsubscribe();
      }, []);

    
    return {
        accountState, 
        openNewAccount: individualAccountStore.openNewAccount,
        loadAccountsFromLocalStorage: individualAccountStore.loadAccountsFromLocalStorage
    }
}