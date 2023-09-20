import React from "react";
import { useOnboardWalletHook } from "../hooks/useOnboardWalletHook";
import { useIndividualAccountHook } from "../hooks/useIndividualAccountHook";
import { PortfolioBalance } from '../components/PortfolioBalance';
import { AssetsList } from "../components/AssetsList";
import { Convert } from '../components/Convert';
import { Lending } from '../components/Lending';
function DashboardPage(): JSX.Element {
  const { firstAccountAddress } = useOnboardWalletHook();
  const { accountState } = useIndividualAccountHook();
  console.debug("firstAccountAddress", firstAccountAddress);
  console.debug("accountState", accountState);
  return (
    <>
      <div className="flex flex-row mb-10">
        <div className="basis-2/5 pr-10">
         <PortfolioBalance />
        </div>

        <div className="basis-3/5">
          <AssetsList />
        </div>
      </div>
      
      <div className="flex flex-row">
        <div className="basis-2/5">
          <Convert />
        </div>

        <div className="basis-3/5">

          <Lending />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
