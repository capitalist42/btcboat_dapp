import type { FC } from "react";
import React from "react";

const lendPools = [
  {
    asset: "RBTC",
    apy: "4%",
  },
];

export interface LendingProps {}

export const Lending: FC<LendingProps> = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-10">
      <h1 className="text-base font-semibold leading-6 text-white">
        Lending
      </h1>

      <div className="mt-8 flow-root">
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
                {lendPools.map((lendPool) => (
                  <tr key={lendPool.asset}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                      {lendPool.asset}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                      {lendPool.apy}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                      N/A
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-white">
                      N/A
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
