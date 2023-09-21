import React, { useCallback, useEffect, useState } from "react";
import { isAddressContainCode } from "../utils/isAddressContainCode";
import { useOnboardWalletHook } from "../hooks/useOnboardWalletHook";
import { useIndividualAccountHook } from "../hooks/useIndividualAccountHook";
import { DeployAccountModal } from "../components/DeployAccountModal";
import { PortfolioBalance } from "../components/PortfolioBalance";
import { AssetsList } from "../components/AssetsList";
import { Convert } from "../components/Convert";
import { Lending } from "../components/Lending";

function DashboardPage(): JSX.Element {
  console.debug("DashboardPage");
  const { firstAccountAddress, web3Provider } = useOnboardWalletHook();
  const { accountState } = useIndividualAccountHook();
  const [isDeployAccountModalOpen, setOpenDeployAccountModal] = useState(false);
  const [doneCheckingIndividualAccountDeploymentStatus, setDoneCheckingIndividualAccountDeploymentStatus] = useState(false)
  const firstIndividualAccountAddress = accountState.data[0]
    ? accountState.data[0].address
    : null;


  useEffect(() => {
    // check firstIndividualAccountAddress deployment status on chain
    async function checkIndividualAccountDeploymentStatus() {
      if (web3Provider && firstIndividualAccountAddress) {
        const isDeployed = await isAddressContainCode(
          web3Provider,
          firstIndividualAccountAddress
        );
        if (!isDeployed) {
          setOpenDeployAccountModal(true);
          setDoneCheckingIndividualAccountDeploymentStatus(true);
        }
      }
    }
    if (!doneCheckingIndividualAccountDeploymentStatus) {
      checkIndividualAccountDeploymentStatus();
    } 
  }, [web3Provider, firstIndividualAccountAddress, doneCheckingIndividualAccountDeploymentStatus])

  return (
    <>
      <DeployAccountModal
        individualAccountAddress={firstIndividualAccountAddress}
        open={isDeployAccountModalOpen}
        setOpen={setOpenDeployAccountModal}
      />
      <div className="grid grid-cols-1 gap-4">
        <div className="">
          <PortfolioBalance />
        </div>

        <div className="">
          <AssetsList />
        </div>
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
