import React, { FC, PropsWithChildren, useEffect } from "react";
import {
  setProvider as setRIFRelayClientProvider,
  setEnvelopingConfig as setRIFRelayClientEnvelopingConfig,
} from "@rsksmart/rif-relay-client";
// import ethers from 'ethers'
// import { getProvider } from '@sovryn/ethers-provider';
import { useOnboardWalletHook } from "../hooks/useOnboardWalletHook";
export const RelaySystemProvider: FC<PropsWithChildren> = ({ children }) => {

  const { web3Provider } = useOnboardWalletHook();
  useEffect(() => {
    if (web3Provider) {
      console.debug("setProvider for rif-relay-client");
      setRIFRelayClientProvider(web3Provider);
    }
    const logLevel = 1;
    const chainId = parseInt(process.env["REACT_APP_RIF_RELAY_CHAIN_ID"]!);
    const relayHubAddress = process.env["REACT_APP_RIF_RELAY_HUB_ADDRESS"]!;
    const relayVerifierAddress =
      process.env["REACT_APP_RIF_RELAY_VERIFIER_ADDRESS"]!;
    const deployVerifierAddress =
      process.env["REACT_APP_RIF_DEPLOY_VERIFIER_ADDRESS"]!;
    const smartWalletFactoryAddress = 
        process.env['REACT_APP_CONTRACTS_SMART_WALLET_FACTORY']!;
    const forwarderAddress =
      process.env["REACT_APP_CONTRACTS_SMART_WALLET"]!;
    const preferredRelays =
      process.env["REACT_APP_RIF_RELAY_PREFERRED_RELAYS"]!.split(",");
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
