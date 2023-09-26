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

function DashboardPage(): JSX.Element {
  console.debug("DashboardPage");
  const chainId = 31;

  const { firstAccountAddress, web3Provider } = useOnboardWalletHook();
  const {
    accountState,
    individualAccountDeploymentLoading,
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
  const firstIndividualAccountDeployed = accountState.data[0] ? accountState.data[0].isDeployed : null;
  const handleDeployIndividualAccountButtonClicked = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    // calling deployIndividualAccount function
    console.log("handleDeployButtonClicked...");
    const relayClient = new RelayClient();
    deployIndividualAccount(
      chainId,
      web3Provider!,
      relayClient,
      firstAccountAddress!
    );
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
  }, [firstIndividualAccountDeployed])

  return (
    <>
      <DeployIndividualAccountModal
        individualAccountAddress={firstIndividualAccountAddress}
        open={isDeployAccountModalOpen}
        setOpen={setOpenDeployAccountModal}
        handleDeployIndividualAccountButtonClicked={
          handleDeployIndividualAccountButtonClicked
        }
        individualAccountDeploymentLoading={individualAccountDeploymentLoading}
      />
      <h1 className="text-white">
        {firstIndividualAccountAddress} Individual Account
      </h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="">
          <PortfolioBalance />
        </div>
        {firstIndividualAccountAddress && web3Provider ? (
          <div className="">
            <AssetsList
              individualAccountAddress={firstIndividualAccountAddress!}
              web3Provider={web3Provider!}
            />
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="">
          <Convert />
        </div>

        <div className="">
          <Lending />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
