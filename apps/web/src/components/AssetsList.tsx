import type { FC } from "react";
import React, { useEffect } from "react";
import { providers, utils } from "ethers";
import { ERC20__factory, ERC20 } from "@rsksmart/rif-relay-contracts";

export interface AssetsListProps {
  individualAccountAddress: string;
  web3Provider: providers.Web3Provider;
}

export const AssetsList: FC<AssetsListProps> = ({
  web3Provider,
  individualAccountAddress,
}) => {
  const [btcBalance, setBTCBalance] = React.useState<string>("");
  const [dllrBalance, setDLLRBalance] = React.useState<string>("");

  useEffect(() => {
    // fetch BTC balance
    async function fetchBTCBalance(address: string) {
      const balance = await web3Provider.getBalance(address);
      setBTCBalance(utils.formatUnits(balance));
    }
    async function fetchDLLRBalance(address: string) {
      const dllrTokenAddressTestnet =
        "0x007b3aa69a846cb1f76b60b3088230a52d2a83ac";

      const dllrTestnetContract: ERC20 = ERC20__factory.connect(
        dllrTokenAddressTestnet,
        web3Provider
      );
      const balance = await dllrTestnetContract.balanceOf(address);
      setDLLRBalance(utils.formatUnits(balance));
    }
    fetchBTCBalance(individualAccountAddress);
    fetchDLLRBalance(individualAccountAddress);
  }, [web3Provider, individualAccountAddress]);

  return (
    <div>
      <h1 className="text-base font-semibold leading-6 text-white">Assets</h1>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          key="BTC"
          className="overflow-hidden rounded-lg bg-gray-800 px-4 py-5 shadow sm:p-6"
        >
          <dt className="truncate text-sm font-medium text-white">BTC</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
            {btcBalance}
          </dd>
        </div>

        <div
          key="DLLR"
          className="overflow-hidden rounded-lg bg-gray-800 px-4 py-5 shadow sm:p-6"
        >
          <dt className="truncate text-sm font-medium text-white">DLLR</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
            {dllrBalance}
          </dd>
        </div>

        <div
          key="Other"
          className="overflow-hidden rounded-lg bg-gray-800 px-4 py-5 shadow sm:p-6"
        >
          <dt className="truncate text-sm font-medium text-white">Other</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
            N/A
          </dd>
        </div>
      </dl>
    </div>
  );
};
