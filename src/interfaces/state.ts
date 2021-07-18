import { CURRENCY } from "./currency";
import { IUser } from "./user";

export interface IRootState {
  user: IUser;
  currencies: {
    currency: CURRENCY;
  };
  exchange: {
    isOpen: boolean;
    from: CURRENCY;
    to: CURRENCY;
    fromAmount: number;
  };
}