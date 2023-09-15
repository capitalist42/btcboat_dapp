import React, { useEffect, useState } from "react";
// import type { ERC20 } from '@rsksmart/rif-relay-contracts';
import { useOnboardWalletHook } from "../hooks/useOnboardWalletHook";
import { useIndividualAccountHook } from "../hooks/useIndividualAccountHook";
import { fetchERC20Token } from "../utils/fetchERC20Token";
import { fetchERC20TokenBalance } from "../utils/fetchERC20TokenBalance";
import { formatERC20TokenBalance } from "../utils/formatERC20TokenBalance";

function AccountPage(): JSX.Element {
  const { firstAccountAddress, web3Provider } = useOnboardWalletHook();
  const { accountState } = useIndividualAccountHook();
  // const { dllrContract}
  const [dllrBalance, setDLLRBalance] = useState("");
  console.debug("firstAccountAddress", firstAccountAddress);
  console.debug("accountState", accountState);

  useEffect(() => {
    if (accountState.data.length > 0) {
      const dllrContractAddress = "0x007b3AA69A846Cb1f76B60B3088230A52D2A83aC".toLowerCase();
      const accountAddress = accountState.data[0].address;
      console.debug("calling to get erc20 contract...")
      fetchERC20Token(web3Provider, dllrContractAddress).then((token) => {
        console.debug("token", token)
        fetchERC20TokenBalance(token.contract, accountAddress).then((balance) => {
          console.debug("dllrBalance", balance)
          const formattedBalance = formatERC20TokenBalance(balance, token.decimals)
          setDLLRBalance(formattedBalance);
        });
          
      })
    }
    
  }, [web3Provider, accountState, setDLLRBalance]);

  return (
    <div>
      Account Info: <br />
      "EOA" Address: {firstAccountAddress} <br />
      "Individual Account" Address:{" "}
      {accountState.data.length > 0
        ? accountState.data[0].address
        : "No Account"} <br />
      "Individual Account" Balance:{" "}
      {accountState.data.length > 0 ? dllrBalance : "No Account"}
    </div>
  );
}

export default AccountPage;
