import type { FC } from "react";
import React from "react";
// import { gql, useQuery } from "@apollo/client";
import { lendingPoolList } from "../utils/LendingPoolMap";
import { LendingRow } from "./LendingRow";
// const QUERY_LENDING_POOLS = gql`
// query getLendingPools {
//   lendingPools {
//     id
//     underlyingAsset { name symbol}
//     poolTokenBalance
//     assetBalance
//     totalAssetLent
//   }
// }
// `;

const lendingPools = lendingPoolList();
export interface LendingProps {}

export const Lending: FC<LendingProps> = () => {
  // const {
  //   loading: getLendingPoolsLoading,
  //   error: getLendingPoolsError,
  //   data: getLendingPoolsData,
  // } = useQuery(QUERY_LENDING_POOLS);
  // if (getLendingPoolsLoading) return <p>Loading...</p>;
  // if (getLendingPoolsError)
  //   return <p>Error : {getLendingPoolsError.message}</p>;

  return (
    <div className="">
      <h1 className="text-base font-semibold leading-6 text-white">Lending</h1>

      <div className="flow-root bg-gray-800 rounded-lg mt-5 p-10">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white   sm:pl-0"
                  >
                    Asset
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    APY
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Balance
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Interest earned
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lendingPools.map((lendingPool) => (
      
                  <LendingRow pool={lendingPool} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
