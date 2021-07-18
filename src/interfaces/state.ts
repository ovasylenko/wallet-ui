import { CURRENCY } from "./currency";
import { OPERATIONS } from "./operations";
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
    amount: number;
    operation: OPERATIONS;
  };
}