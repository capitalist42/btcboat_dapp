import type { FC } from "react";
import React from "react";

export interface ConvertProps {}

export const Convert: FC<ConvertProps> = () => {
  return (
    <div>
      <h1 className="text-base font-semibold leading-6 text-white">
        Convert
      </h1>

      <div className="mt-5 sm:w-full sm:max-w bg-gray-800 p-10 rounded-md">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="fromAmount"
              className="block text-sm font-medium leading-6 text-white"
            >
              From
            </label>
            <div className="mt-2">
              <input
                id="fromAmount"
                name="fromAmount"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
              />
            </div>
          </div>

          <div>
              <label
                htmlFor="toAmount"
                className="block text-sm font-medium leading-6 text-white"
              >
                To
              </label>
              
            <div className="mt-2">
              <input
                id="toAmount"
                name="toAmount"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Swap
            </button>
          </div>
        </form>

        
      </div>
    </div>
  );
};
