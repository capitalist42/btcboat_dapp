import type { FC } from "react";
import React, { useState, useEffect, MouseEvent } from "react";
import { providers, utils } from "ethers";
import { ERC20__factory, ERC20 } from "@rsksmart/rif-relay-contracts";
import { TransferModal } from "./TransferModal";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { UserDefinedRelayRequest } from "@rsksmart/rif-relay-client";
import { RelayClient } from "@rsksmart/rif-relay-client";
export interface AssetsListProps {
  accountAddress: string;
  individualAccountAddress: string;
  web3Provider: providers.Web3Provider;
}

export const AssetsList: FC<AssetsListProps> = ({
  web3Provider,
  accountAddress,
  individualAccountAddress,
}) => {
  const [btcBalance, setBTCBalance] = useState<string>("");
  const [dllrBalance, setDLLRBalance] = useState<string>("");
  const [openTransferModel, setOpenTransferModel] = useState<boolean>(false);

  const fetchDLLRBalance = async (address: string) => {
    const dllrTokenAddressTestnet =
      "0x007b3aa69a846cb1f76b60b3088230a52d2a83ac";

    const dllrTestnetContract: ERC20 = ERC20__factory.connect(
      dllrTokenAddressTestnet,
      web3Provider
    );

    const balance = await dllrTestnetContract.balanceOf(address);
    setDLLRBalance(utils.formatUnits(balance));
  };

  const transferDLLR = async (address: string, amount: string) => {
    const dllrTokenAddressTestnet =
      "0x007b3aa69a846cb1f76b60b3088230a52d2a83ac";

    const dllrTestnetContract: ERC20 = ERC20__factory.connect(
      dllrTokenAddressTestnet,
      web3Provider
    );

    // generate encodedABI
    const encodedTransferFunctionData =
      dllrTestnetContract.interface.encodeFunctionData("transfer", [
        address,
        utils.parseEther(amount),
      ]);
    // define UserDefinedRelayRequest
    const request: UserDefinedRelayRequest = {
      request: {
        from: accountAddress,
        data: encodedTransferFunctionData,
        to: dllrTokenAddressTestnet,
        tokenAmount: "0",
        tokenContract: dllrTokenAddressTestnet,
      },
      relayData: {
        callForwarder: individualAccountAddress,
      },
    };
    // call relayTransaction with relayClient
    const relayClient = new RelayClient();
    const tx = await relayClient.relayTransaction(request);
    console.debug("relayTx:", tx);
    const receipt = await web3Provider.waitForTransaction(
      tx.hash!,
      1,
      360 * 1000
    );
    console.debug("receipt:", receipt);
  };

  const onTransferFormSubmit = async (
    address: string,
    amount: string
  ): Promise<void> => {
    await transferDLLR(address, amount);
    fetchDLLRBalance(individualAccountAddress);
  };

  const onClickTransferButton = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    setOpenTransferModel(true);
  };

  useEffect(() => {
    // fetch BTC balance
    const fetchBTCBalance = async (address: string) => {
      const balance = await web3Provider.getBalance(address);
      setBTCBalance(utils.formatUnits(balance));
    };

    const fetchDLLRBalance = async (address: string) => {
      const dllrTokenAddressTestnet =
        "0x007b3aa69a846cb1f76b60b3088230a52d2a83ac";

      const dllrTestnetContract: ERC20 = ERC20__factory.connect(
        dllrTokenAddressTestnet,
        web3Provider
      );

      const balance = await dllrTestnetContract.balanceOf(address);
      setDLLRBalance(utils.formatUnits(balance));
    };

    fetchBTCBalance(individualAccountAddress);
    fetchDLLRBalance(individualAccountAddress);
  }, [web3Provider, individualAccountAddress]);

  return (
    <>
      <TransferModal
        web3Provider={web3Provider}
        accountAddress={accountAddress}
        individualAccountAddress={individualAccountAddress}
        open={openTransferModel}
        setOpen={setOpenTransferModel}
        onTransferFormSubmit={onTransferFormSubmit}
      />

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
            <button
              className={""}
              disabled={false}
              onClick={onClickTransferButton}
              type="button"
            >
              <ArrowUpRightIcon
                className="h-6 w-6 text-green-600"
                aria-hidden="true"
              />
            </button>
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
    </>
  );
};
