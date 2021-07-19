import { USER_ACTIONS } from "@data/actions/user";
import { IUser, IWallet } from "interfaces/user";
import { Dispatch } from "react";
import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { CURRENCY } from "@I/currency";
import { IWalletAction } from "./user";
import { EXHANGE_ACTIONS } from "@data/actions/exchange";
import { OPERATIONS } from "@I/operations";
import { IRootState } from "@I/state";
import { changeDefaultCurrency } from "./currencies";

const initialState = {
  isOpen: false,
  from: CURRENCY.USD,
  to: CURRENCY.EUR,
  amount: 0,
  operation: OPERATIONS.EXCHANGE,
};

interface IExchangeOperation {
  operation: OPERATIONS;
  from: CURRENCY;
  to: CURRENCY;
  amount: number;
}

interface IExchangeOperationAction extends IExchangeOperation, Action {}

interface IExchangeAmountAction extends Action {
  amount: number;
}

export default (
  state = initialState,
  action: Action | IExchangeOperationAction
) => {
  switch (action.type) {
    case EXHANGE_ACTIONS.TOGGLE_EXCHANGE: {
      return {
        ...state,
        isOpen: !state.isOpen,
        operation: (action as IExchangeOperationAction).operation,
        from: (action as IExchangeOperationAction).from,
        to: (action as IExchangeOperationAction).to,
        amount: (action as IExchangeOperationAction).amount
      };
    }

    case EXHANGE_ACTIONS.CHANGE_AMOUNT: {
      return {
        ...state,
        amount: (action as IExchangeAmountAction).amount,
      };
    }
    default:
      return state;
  }
};

export const changeAmount: ActionCreator<
  ThunkAction<void, IUser, void, IExchangeAmountAction>
> = (amount: number) => {
  return (dispatch: Dispatch<IExchangeAmountAction>): void => {
    dispatch({
      type: EXHANGE_ACTIONS.CHANGE_AMOUNT,
      amount,
    });
  };
};

export const toggleExchangeSlideover: ActionCreator<
  ThunkAction<void, IUser, void, IExchangeOperationAction>
> = (args: IExchangeOperation) => {
  return (dispatch: Dispatch<IExchangeOperationAction>): void => {
    dispatch({
      type: EXHANGE_ACTIONS.TOGGLE_EXCHANGE,
      ...args,
    });
  };
};

export const submitOperation: ActionCreator<
  ThunkAction<void, IRootState, void, IWalletAction>
> = () => {
  return async (
    dispatch: Dispatch<
      IWalletAction | ThunkAction<Promise<void>, IUser, CURRENCY, IWalletAction>
    >,
    getState: () => IRootState
  ): Promise<void> => {
    const state = getState();
    const { from, to, operation, amount } = state.exchange;

    if (operation === OPERATIONS.EXCHANGE) {
      const { data: wallet }: { data: IWallet } = await axios.post(
        `/api/v1/wallet/exchange/${from}/${to}`,
        {
          amount: amount,
        }
      );
      dispatch(changeDefaultCurrency(state.currencies.currency));

      return dispatch({
        type: USER_ACTIONS.REFRESH_WALLET,
        wallet,
      });
    } else {
      const { data: wallet }: { data: IWallet } = await axios.post(
        `/api/v1/wallet/deposit/${to}`,
        {
          amount: amount,
        }
      );
      dispatch({
        type: USER_ACTIONS.REFRESH_WALLET,
        wallet,
      });

      dispatch(changeDefaultCurrency(state.currencies.currency));
    }
  };
};
