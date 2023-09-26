import type { FC } from "react";
import React from "react";

export interface PortfolioBalanceProps {}

export const PortfolioBalance: FC<PortfolioBalanceProps> = () => {
  return (
    <div>
      <h1 className="text-base font-semibold leading-6 text-white">
        Portfolio
      </h1>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1">
        <div
          key="Portfolio"
          className="overflow-hidden rounded-lg bg-gray-800 px-4 py-5 shadow sm:p-6"
        >
          <dt className="truncate text-sm font-medium text-white">
            Balance
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
            N/A
          </dd>
        </div>
      </dl>
    </div>
  );
};
