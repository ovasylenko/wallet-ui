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

const initialState = {
  isOpen: true,
  from: CURRENCY.USD,
  to: CURRENCY.EUR,
  amount: 0,
  operation: OPERATIONS.EXCHANGE
};

interface IExchangeOperation {
  operation: OPERATIONS;
  from: CURRENCY;
  to: CURRENCY;
  amount: number;
}

interface IExchangeOperationAction extends IExchangeOperation, Action {}

interface IExchangeAmountAction extends Action {
  amount: number
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
  return (dispatch: Dispatch<IExchangeAmountAction>,): void => {

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
  ThunkAction<void, IUser, void, IExchangeOperationAction>
> = (args: IExchangeOperation) => {
  return (dispatch: Dispatch<IExchangeOperationAction>): void => {
    dispatch({
      type: EXHANGE_ACTIONS.CHANGE_AMOUNT,
      ...args,
    });
  };
};
