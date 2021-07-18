import { CURRENCY } from "@I/currency";
import { IRootState } from "@I/state";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "d3-format";
import { CurrencySwitch } from "./currency-switch";
import { ICurrencyDetails } from "@I/user";
import { toggleExchangeSlideover } from "@data/reducers/exchange";

const f = format(",.2f");

interface IProps {
  details: ICurrencyDetails;
  name: string;
  currencies: string[];
  currentDetails: ICurrencyDetails;
}

export const CurrencyCard: React.FC<IProps> = ({
  details,
  name,
  currencies,
  currentDetails,
}) => {
  const [switchValue, setSwitch] = useState(name);
    const dispatch = useDispatch();

  return (
    <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-900 text-sm font-medium truncate">
              {name}
            </h3>
          </div>
          <p className="mt-1 text-gray-500 text-sm truncate">
            {f(currentDetails?.value ?? 0)}
          </p>
        </div>
        <div>{f(details?.value ?? 0)}</div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="-ml-px w-0 flex-1 flex flex items-center justify-around">
            <span className="ml-3 mr-5">Convert to</span>
            <CurrencySwitch
              currencies={currencies.filter((it) => it !== name)}
              active={switchValue}
              onChange={(value) => {
                setSwitch(value);
                dispatch(toggleExchangeSlideover());
              }}
            />
            <div className="flex w-16 h-full">
              {" "}
              <button
                type="button"
                className="relative inline-flex items-center  px-4 py-2  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
               +
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CurrencyCard;
