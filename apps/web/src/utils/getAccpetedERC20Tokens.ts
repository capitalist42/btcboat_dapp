import { providers } from "ethers";
import {
    DeployVerifier__factory,
    RelayVerifier__factory,
  } from '@rsksmart/rif-relay-contracts';

export const getAcceptedERC20Tokens = async (
  web3Provider: providers.Web3Provider
) => {
    const deployVerifier = DeployVerifier__factory.connect(
        process.env['REACT_APP_CONTRACTS_INDIVIDUAL_ACCOUNT_DEPLOY_VERIFIER']!,
        web3Provider
      );
      const relayVerifier = RelayVerifier__factory.connect(
        process.env['REACT_APP_CONTRACTS_INDIVIDUAL_ACCOUNT_RELAY_VERIFIER']!,
        web3Provider
      );
    
      const tokens = new Set<string>([
        ...(await deployVerifier.getAcceptedTokens()),
        ...(await relayVerifier.getAcceptedTokens()),
      ]);
    
      return tokens.values();
};
