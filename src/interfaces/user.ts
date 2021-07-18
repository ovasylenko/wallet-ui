import { CURRENCY } from "@I/currency";

export interface ICurrencyDetails {
  value: number;
}

export interface IWallet {
  [c: string]: ICurrencyDetails;
}

export interface IUser {
  name: string;
  email: string;
  userpic: string;
  wallet: {
    [c in CURRENCY]?: ICurrencyDetails;
  };
  currentCurrency: {
    [c in CURRENCY]?: ICurrencyDetails;
  };
}
