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
