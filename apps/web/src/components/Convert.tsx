import type { FC } from "react";
import React from "react";

export interface ConvertProps {}

export const Convert: FC<ConvertProps> = () => {
  return (
    <div>
      <h1 className="text-base font-semibold leading-6 text-gray-900">
        Convert
      </h1>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="fromAmount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              From
            </label>
            <div className="mt-2">
              <input
                id="fromAmount"
                name="fromAmount"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
              <label
                htmlFor="toAmount"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                To
              </label>
              
            <div className="mt-2">
              <input
                id="toAmount"
                name="toAmount"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Confirm Convert 
            </button>
          </div>
        </form>

        
      </div>
    </div>
  );
};
