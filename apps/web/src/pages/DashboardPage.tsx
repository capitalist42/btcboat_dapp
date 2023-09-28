import React, { useEffect, useState } from "react";
import { isAddressContainCode } from "../utils/isAddressContainCode";
import { useOnboardWalletHook } from "../hooks/useOnboardWalletHook";
import { useIndividualAccountHook } from "../hooks/useIndividualAccountHook";
import { DeployIndividualAccountModal } from "../components/DeployIndividualAccountModal";
import { PortfolioBalance } from "../components/PortfolioBalance";
import { AssetsList } from "../components/AssetsList";
import { Convert } from "../components/Convert";
import { Lending } from "../components/Lending";
import { RelayClient } from "@rsksmart/rif-relay-client";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   gql,
// } from "@apollo/client";

// const sovrynSubgraphclient = new ApolloClient({
//   uri: "https://subgraph.sovryn.app/subgraphs/name/DistributedCollective/sovryn-subgraph",
//   cache: new InMemoryCache(),
// });

// const QUERY_LENDING_POOLS = gql`
//   query getLendingPools {
//     lendingPools {
//       id
//       underlyingAsset {
//         name
//         symbol
//       }
//       poolTokenBalance
//       assetBalance
//       totalAssetLent
//     }
//   }
// `;
// sovrynSubgraphclient
//   .query({ query: QUERY_LENDING_POOLS })
//   .then((result) => console.log(result));
function DashboardPage(): JSX.Element {
  console.debug("DashboardPage");
  const chainId = 31;

  const { firstAccountAddress, web3Provider } = useOnboardWalletHook();
  const {
    accountState,
    deployIndividualAccount,
  } = useIndividualAccountHook();
  const [isDeployAccountModalOpen, setOpenDeployAccountModal] = useState(false);
  const [
    doneCheckingIndividualAccountDeploymentStatus,
    setDoneCheckingIndividualAccountDeploymentStatus,
  ] = useState(false);
  const firstIndividualAccountAddress = accountState.data[0]
    ? accountState.data[0].address
    : null;
  const firstIndividualAccountDeployed = accountState.data[0]
    ? accountState.data[0].isDeployed
    : null;

  const handleDeployIndividualAccount = async () => {
    const relayClient = new RelayClient();
    await deployIndividualAccount(
      chainId,
      web3Provider!,
      relayClient,
      firstAccountAddress!
    );
      
  };

  const onConvertFormSubmit = async (
    fromToken: string,
    fromAmount: string,
    toToken: string,
    toAmount: string
  ): Promise<void> => {
    console.log("onConvertFormSubmit");
  };

  useEffect(() => {
    // check firstIndividualAccountAddress deployment status on chain
    async function checkIndividualAccountDeploymentStatus() {
      console.debug("checkIndividualAccountDeploymentStatus");
      console.debug("web3Provider", web3Provider);
      console.debug(
        "firstIndividualAccountAddress",
        firstIndividualAccountAddress
      );
      if (web3Provider && firstIndividualAccountAddress) {
        const isDeployed = await isAddressContainCode(
          web3Provider,
          firstIndividualAccountAddress
        );
        if (!isDeployed) {
          setOpenDeployAccountModal(true);
        } else {
          console.debug(
            `${firstIndividualAccountAddress} is deployed with code`
          );
        }
        setDoneCheckingIndividualAccountDeploymentStatus(true);
      }
    }
    if (!doneCheckingIndividualAccountDeploymentStatus) {
      checkIndividualAccountDeploymentStatus();
    }
  }, [
    web3Provider,
    firstIndividualAccountAddress,
    doneCheckingIndividualAccountDeploymentStatus,
  ]);

  useEffect(() => {
    if (firstIndividualAccountDeployed) {
      setOpenDeployAccountModal(false);
    }
  }, [firstIndividualAccountDeployed]);

  return (
    <>
      <DeployIndividualAccountModal
        individualAccountAddress={firstIndividualAccountAddress}
        open={isDeployAccountModalOpen}
        setOpen={setOpenDeployAccountModal}
        handleDeployIndividualAccount={
          handleDeployIndividualAccount
        }
      />
      <h1 className="text-white">
        {firstIndividualAccountAddress} Individual Account
      </h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="">
          <PortfolioBalance />
        </div>
        {firstAccountAddress &&
        firstIndividualAccountAddress &&
        web3Provider ? (
          <div className="">
            <AssetsList
              accountAddress={firstAccountAddress!}
              individualAccountAddress={firstIndividualAccountAddress!}
              web3Provider={web3Provider!}
            />
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="">
          <Convert onConvertFormSubmit={onConvertFormSubmit} />
        </div>

        <div className="">
            <Lending />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
