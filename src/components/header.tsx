import { CURRENCY } from "@I/currency";
import { IRootState } from "@I/state";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IWallet } from "@I/user";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { changeDefaultCurrency } from "@data/reducers/currencies";

function Header() {
  const currency = useSelector((s: IRootState) => s.currencies.currency);
  const wallet = useSelector((s: IRootState) => s.user.wallet);
  const dispatch = useDispatch();

  return (
    <header className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Wallet
          </h2>
        </div>
        <div className="mt-10 lg:mt-0 w-full max-w-xs">
          <label
            htmlFor="currency"
            className="block text-base font-medium text-gray-300"
          >
            Currency
          </label>
          <div className="mt-1.5 relative">
            <select
              id="currency"
              name="currency"
              className="appearance-none block w-full bg-none bg-gray-700 border border-transparent rounded-md pl-3 pr-10 py-2 text-base text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm"
              defaultValue={currency}
              onChange={()=>{
                dispatch(changeDefaultCurrency(currency));
              }}
            >
              {Object.keys(wallet).map((it) => {
                return (
                  <option key={it} selected={currency === it}>
                    {it}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
              <ChevronDownIcon
                className="h-4 w-4 text-white"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header