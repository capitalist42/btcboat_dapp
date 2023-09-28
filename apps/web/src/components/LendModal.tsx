import type { FC } from "react";
import React, { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/solid";
export interface TransferModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLend: () => Promise<void>;
}

export const LendModal: FC<TransferModalProps> = ({
  open,
  setOpen,
  handleLend,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const cancelButtonRef = useRef(null);

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    setAddress(event.target.value);
  };

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    setAmount(event.target.value);
  };

  const onFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    await handleLend();
    setLoading(false);
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <form onSubmit={onFormSubmit}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <BanknotesIcon
                        className="h-6 w-6 text-orange-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Transfer
                      </Dialog.Title>
                      <div className="mt-2">
                        <label
                          htmlFor="transfer"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Address
                        </label>
                        <div className="mt-2">
                          <input
                            type="transfer"
                            name="transfer"
                            id="transfer"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder=""
                            aria-describedby="transfer-description"
                            onChange={handleAddressChange}
                            value={address}
                          />
                        </div>
                        <p
                          className="mt-2 text-sm text-gray-500"
                          id="transfer-description"
                        >
                          the address.
                        </p>
                        <label
                          htmlFor="amount"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Amount
                        </label>
                        <div className="mt-2">
                          <input
                            type="amount"
                            name="amount"
                            id="amount"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder=""
                            aria-describedby="amount-description"
                            onChange={handleAmountChange}
                            value={amount}
                          />
                        </div>
                        <p
                          className="mt-2 text-sm text-gray-500"
                          id="amount-description"
                        >
                          the amount of DLLR you like to transfer.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      value="Submit"
                      disabled={loading}
                      className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:col-start-2"
                    >
                      {loading ? (
                        <>
                          <SunIcon
                            className="animate-spin h-5 w-5 mr-3 ..."
                            viewBox="0 0 24 24"
                          />
                          Confirming...
                        </>
                      ) : (
                        <>Confirm</>
                      )}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      {loading ? <>Dismiss</> : <>Cancel</>}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>{" "}
            </form>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
