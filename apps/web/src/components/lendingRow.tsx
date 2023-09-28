import type { FC } from "react";
import React, { useState, useEffect, useMemo } from "react";
import { ChainId } from "@sovryn/ethers-provider";
import { Contract, ContractInterface, utils } from "ethers";
import { ContractGroup, getContract, SupportedTokens } from "@sovryn/contracts";
import { ChainIds } from '@sovryn/ethers-provider';

import { LendingPool } from "../utils/LendingPoolMap";
import { useOnboardWalletHook } from "../hooks/useOnboardWalletHook";

interface LendingFrameProps {
  pool: LendingPool;
}

export const LendingRow: FC<LendingFrameProps> = ({ pool }) => {
  const chainId: ChainId = ChainIds.RSK_TESTNET

  const asset = useMemo(() => pool.getAsset(), [pool]);
  const { web3Provider } = useOnboardWalletHook();

  const [contractAddress, setContractAddress] = useState<string | undefined>(
    undefined
  );
  const [contractAbi, setContractAbi] = useState<ContractInterface | undefined>(
    undefined
  );
  const [totalAssetBorrow, setTotalAssetBorrow] = useState<string | undefined>(
    undefined
  );
  const [availableAmount, setAvailableAmount] = useState<string | undefined>(
    undefined
  );
  // const balance = await contract.totalAssetBorrow();
  // return utils.formatUnits(balance);

  useEffect(() => {
    const getLoanTokenContract = async () => {
      const { address: contractAddress, abi: contractAbi } = await getContract(
        asset,
        "loanTokens",
        chainId
      );
      setContractAddress(contractAddress);
      setContractAbi(contractAbi);
    };
    getLoanTokenContract();
  }, [asset, chainId]);

  useEffect(() => {
    const fetchLendingPoolData = async() => {
      if (contractAddress && contractAbi && web3Provider) {
        const contract = new Contract(contractAddress, contractAbi, web3Provider);
        const totalAssetBorrowValue = await contract.totalAssetBorrow();
        const totalAssetBorrow = utils.formatUnits(totalAssetBorrowValue);
        const availableAmountValue = await contract.marketLiquidity();
        const availableAmount = utils.formatUnits(availableAmountValue);
        setTotalAssetBorrow(totalAssetBorrow);
        setAvailableAmount(availableAmount);
      }
    }
    console.debug("fetchLendingPoolData");
    fetchLendingPoolData()
  }, [contractAddress, contractAbi, web3Provider]);

  return (
    <>
      <tr key={pool.getName()}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
          {pool.getName()}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">....</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
          {totalAssetBorrow}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
          {availableAmount}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
          <button
            type="button"
            className="rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Lend
          </button>
        </td>
      </tr>
    </>
  );
};
