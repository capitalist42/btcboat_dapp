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
            $4,501.32
          </dd>
        </div>
      </dl>
    </div>
  );
};

// <ul className="grid grid-cols-1 gap-6">
//   <li
//     key="RBTC"
//     className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
//   >
//     <div className="flex w-full items-center justify-between space-x-6 p-6">
//       <div className="flex-1 truncate">
//         <div className="flex items-center space-x-3">
//           <h3 className="truncate text-sm font-medium text-gray-900">
//             $4,501.32
//           </h3>
//           <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
//             (+$4.2)
//           </span>
//         </div>
//         <p className="mt-1 truncate text-sm text-gray-500">Balance</p>
//       </div>
//     </div>
//   </li>
// </ul>
