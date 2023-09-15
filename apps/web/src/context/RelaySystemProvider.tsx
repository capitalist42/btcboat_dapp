import React, { Dispatch, FC, PropsWithChildren, useLayoutEffect, useState } from "react";
import {
  setProvider as setRIFRelayClientProvider,
  setEnvelopingConfig as setRIFRelayClientEnvelopingConfig,
} from "@rsksmart/rif-relay-client";
import { useOnboardWalletHook } from "../hooks/useOnboardWalletHook";
import { RelaySystemStoreState, relaySystemStore } from "../stores/RelaySystemStore";

// dev: rename to AccountSystemProvider
export const RelaySystemProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState]: [RelaySystemStoreState, React.Dispatch<React.SetStateAction<RelaySystemStoreState>>] = useState(relaySystemStore.initialState);
  console.debug("RelaySystemProvider state", state);
  useLayoutEffect(() => {
    const subscription = relaySystemStore.subscribe(setState);
    relaySystemStore.init();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const { web3Provider } = useOnboardWalletHook();
  useLayoutEffect(() => {
    if (web3Provider) {
      console.debug("setProvider for rif-relay-client");
      setRIFRelayClientProvider(web3Provider);
    }
    const logLevel = 0;
    const chainId = parseInt(process.env["REACT_APP_RIF_RELAY_CHAIN_ID"]!);
    const relayHubAddress = process.env["REACT_APP_CONTRACTS_RELAY_HUB"]!;
    const relayVerifierAddress =
      process.env[
        "REACT_APP_CONTRACTS_INDIVIDUAL_ACCOUNT_RELAY_VERIFIER_ADDRESS"
      ]!;
    const deployVerifierAddress =
      process.env[
        "REACT_APP_CONTRACTS_INDIVIDUAL_ACCOUNT_DEPLOY_VERIFIER_ADDRESS"
      ]!;
    const individualAccountFactoryAddress =
      process.env["REACT_APP_CONTRACTS_INDIVIDUAL_ACCOUNT_FACTORY_ADDRESS"]!;
    // const forwarderAddress = process.env["REACT_APP_CONTRACTS_SMART_WALLET"]!;
    const preferredRelays =
      process.env["REACT_APP_RIF_RELAY_PREFERRED_RELAYS"]!.split(",");
    const envelopingConfig = {
      logLevel,
      chainId,
      relayHubAddress,
      relayVerifierAddress,
      deployVerifierAddress,
      smartWalletFactoryAddress: individualAccountFactoryAddress,
      preferredRelays,
      gasPriceFactorPercent: 0,
      relayLookupWindowBlocks: 1,
    };
    console.debug("envelopingConfig", envelopingConfig);
    setRIFRelayClientEnvelopingConfig(envelopingConfig);
  }, [web3Provider]);

  return <>{children}</>;
};
