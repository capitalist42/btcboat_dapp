import React, { useEffect, useState } from "react";
import { useOnboardWalletHook } from "../hooks/useOnboardWalletHook";
import { useIndividualAccountHook } from "../hooks/useIndividualAccountHook";
import { DeployAccountModal } from "../components/DeployAccountModal";
import { PortfolioBalance } from "../components/PortfolioBalance";
import { AssetsList } from "../components/AssetsList";
import { Convert } from "../components/Convert";
import { Lending } from "../components/Lending";

function DashboardPage(): JSX.Element {
  const { firstAccountAddress } = useOnboardWalletHook();
  const { accountState } = useIndividualAccountHook();
  const [isDeployAccountModalOpen, setOpenDeployAccountModal] = useState(false);
  const firstIndividualAccountAddress = accountState.data[0]
    ? accountState.data[0].address
    : null;

  console.debug("firstAccountAddress", firstAccountAddress);
  console.debug("accountState", accountState);

  useEffect(() => {
    // check firstIndividualAccountAddress deployment status on chain
    setOpenDeployAccountModal(true);
  }, [accountState]);

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
