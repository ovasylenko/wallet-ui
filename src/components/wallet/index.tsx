import { CURRENCY } from "@I/currency";
import { IRootState } from "@I/state";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "d3-format";
import { CurrencySwitch } from "./currency-switch";
import CurrencyCard from "./currency-card";
import { IWallet } from "@I/user";

const f = format(",.2f");

function Wallet() {
  const wallet = useSelector((s: IRootState) => s.user.wallet);
  const currentDetails = useSelector((s: IRootState) => s.user.currentCurrency);

  return (
    <ul className="grid mt-10 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Object.keys(wallet).map((currency, index, currencies) => (
        <CurrencyCard
          key={currency}
          name={currency}
          details={wallet[currency as CURRENCY] ?? { value: 0 }}
          currencies={currencies}
          currentDetails={currentDetails[currency as CURRENCY] ?? { value: 0 }}
        />
      ))}
    </ul>
  );
}

export default Wallet;
