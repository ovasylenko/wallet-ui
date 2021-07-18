import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@I/state";
import { toggleExchangeSlideover } from "@data/reducers/exchange";

export default function ExchangeSlideover() {
  const open = useSelector((s: IRootState) => s.exchange.isOpen);
  const dispatch = useDispatch();

  const setOpen = () => {
    dispatch(toggleExchangeSlideover());
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 overflow-hidden"
        open={open}
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Exchange / Deposit
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={setOpen}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        From
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="flex items-center">EUR</div>
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        To
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="flex items-center">USD</div>
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Amount
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="pt-5">
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Convert
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
