import React from "react";
// import { redirect } from "react-router-dom";
import { useOnboardWalletHook } from "../hooks/useOnboardWalletHook";
import { useIndividualAccountHook } from "../hooks/useIndividualAccountHook";

function AccountPage(): JSX.Element {
  const { firstAccountAddress } = useOnboardWalletHook();
  const { accountState } = useIndividualAccountHook();

  console.debug("firstAccountAddress", firstAccountAddress);
  console.debug("accountState", accountState);
  return (
    <div >
      debug info: <br />
      EOA Address: {firstAccountAddress} <br />
      Account Address: {(accountState.data.length > 0) ? accountState.data[0].address : "No Account"}
    </div>
  );
}

export default AccountPage;
