import type { FC } from "react";
import React, { useState, ChangeEvent, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const tokensList = [
  { id: 1, symbol: "BTC" },
  { id: 2, symbol: "DLLR" },
  { id: 3, symbol: "Fish" },
  { id: 4, symbol: "MOC" },
  { id: 5, symbol: "RIF" },
  { id: 6, symbol: "SOV" },
  { id: 7, symbol: "ZUSD" },
  { id: 8, symbol: "DOC" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface ConvertProps {
  onConvertFormSubmit: (
    fromToken: string,
    fromAmount: string,
    toToken: string,
    toAmount: string
  ) => Promise<void>;
}

export const Convert: FC<ConvertProps> = (onConvertFormSubmit) => {
  const [fromAmount, setFromAmount] = useState<string>("");
  // const [toAmount, setToAmount] = useState<string>("");

  const handleOnFromAmountChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    setFromAmount(event.target.value);
  };


  const onFormSubmit = async () => {
    // await onConvertFormSubmit(fromToken, fromAmount, toToken, toAmount);
  };

  const [selectedFromToken, setSelectedFromToken] = useState(tokensList[0]);
  const [selectedToToken, setSelectedToToken] = useState(tokensList[1]);
  return (
    <div>
      <h1 className="text-base font-semibold leading-6 text-white">Convert</h1>

      <div className="mt-5 sm:w-full sm:max-w bg-gray-800 p-10 rounded-md">
        <form className="space-y-6" onSubmit={onFormSubmit}>
          <div>
            <label
              htmlFor="fromAmount"
              className="block text-sm font-medium leading-6 text-white"
            >
              From
            </label>
            <div className="mt-2 grid grid-cols-3">
              <div className="col-span-2">
                <input
                  id="fromAmount"
                  name="fromAmount"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
                  onChange={handleOnFromAmountChange}
                  value={fromAmount}
                />
              </div>

              <div className="col-span-1">
                <Listbox
                  value={selectedFromToken}
                  onChange={setSelectedFromToken}
                >
                  {({ open }) => (
                    <>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                          <span className="block truncate">
                            {selectedFromToken.symbol}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {tokensList.map((token) => (
                              <Listbox.Option
                                key={token.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-indigo-600 text-white"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                  )
                                }
                                value={token}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate"
                                      )}
                                    >
                                      {token.symbol}
                                    </span>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="toAmount"
              className="block text-sm font-medium leading-6 text-white"
            >
              To
            </label>

            <div className="mt-2 grid grid-cols-3">
              <div className="col-span-2">
                <input
                  id="toAmount"
                  name="toAmount"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
                />
              </div>
              <div className="col-span-1">
                <Listbox value={selectedToToken} onChange={setSelectedToToken}>
                  {({ open }) => (
                    <>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                          <span className="block truncate">
                            {selectedToToken.symbol}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {tokensList.map((token) => (
                              <Listbox.Option
                                key={token.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-indigo-600 text-white"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                  )
                                }
                                value={token}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate"
                                      )}
                                    >
                                      {token.symbol}
                                    </span>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
