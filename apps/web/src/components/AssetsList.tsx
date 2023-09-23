import type { FC } from "react";
import React from "react";

const stats = [
  { name: "BTC Balance", stat: "1 BTC" },
  { name: "DLLR Balance", stat: "4002 DLLR" },
  { name: "Others", stat: "0.1 BTC" },
];
export interface AssetsListProps {}

export const AssetsList: FC<AssetsListProps> = () => {
  return (
    <div>
      <h1 className="text-base font-semibold leading-6 text-white">
        Assets
      </h1>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-gray-800 px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-white">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
