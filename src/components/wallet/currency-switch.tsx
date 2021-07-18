import { CURRENCY } from "@I/currency";
import { IRootState } from "@I/state";
import React from "react";
import classnames from "classnames";

interface IProps {
  currencies: string[];
  active: string;
  onChange: (val: string) => void;
}

export const CurrencySwitch: React.FC<IProps> = ({
  currencies,
  active,
  onChange,
}) => {
  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      {currencies.map((it) => {
        return (
          <button
            key={it}
            type="button"
            onClick={() => onChange(it)}
            className={classnames(
              "relative inline-flex items-center  px-4 py-2  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 ",
              {
                "bg-green-200": active === it,
              }
            )}
          >
            {it}
          </button>
        );
      })}
    </span>
  );
};

export default CurrencySwitch;

