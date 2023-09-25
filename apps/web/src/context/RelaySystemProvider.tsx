import React, { FC, PropsWithChildren, useLayoutEffect } from "react";
import {
  setProvider as setRIFRelayClientProvider,
  setEnvelopingConfig as setRIFRelayClientEnvelopingConfig,
} from "@rsksmart/rif-relay-client";
// import ethers from 'ethers'
// import { getProvider } from '@sovryn/ethers-provider';
import { useOnboardWalletHook } from "../hooks/useOnboardWalletHook";


export const RelaySystemProvider: FC<PropsWithChildren> = ({ children }) => {
  const { web3Provider } = useOnboardWalletHook();
  useLayoutEffect(() => {
    if (web3Provider) {
      console.debug("setProvider for rif-relay-client");
      setRIFRelayClientProvider(web3Provider);
    }
    const logLevel = 1;
    const chainId = parseInt(process.env["REACT_APP_CHAIN_ID"]!);
    const relayHubAddress = process.env["REACT_APP_CONTRACTS_RELAY_HUB"]!;
    const relayVerifierAddress =
      process.env["REACT_APP_CONTRACTS_INDIVIDUAL_ACCOUNT_RELAY_VERIFIER"]!;
    const deployVerifierAddress =
      process.env["REACT_APP_CONTRACTS_INDIVIDUAL_ACCOUNT_DEPLOY_VERIFIER"]!;
    const smartWalletFactoryAddress =
      process.env["REACT_APP_CONTRACTS_INDIVIDUAL_ACCOUNT_FACTORY"]!;
    const forwarderAddress = process.env["REACT_APP_CONTRACTS_INDIVIDUAL_ACCOUNT"]!;
    const preferredRelays =
      process.env["REACT_APP_INDIVIDUAL_ACCOUNT_PREFERRED_RELAYS"]!.split(",");
    const envelopingConfig = {
      logLevel,
      chainId,
      relayHubAddress,
      relayVerifierAddress,
      deployVerifierAddress,
      smartWalletFactoryAddress,
      forwarderAddress,
      preferredRelays,
      gasPriceFactorPercent: 0,
      relayLookupWindowBlocks: 1,
    };
    console.debug("envelopingConfig", envelopingConfig);
    setRIFRelayClientEnvelopingConfig(envelopingConfig);
  }, [web3Provider]);

  return <>{children}</>;
};
