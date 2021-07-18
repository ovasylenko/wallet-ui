import { USER_ACTIONS } from "@data/actions/user";
import { IUser, IWallet } from "interfaces/user";
import { Dispatch } from "react";
import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { CURRENCY } from "@I/currency";
import { IWalletAction } from "./user";
import { EXHANGE_ACTIONS } from "@data/actions/exchange";

const initialState = {
  isOpen: true,
  from: CURRENCY.USD,
  to: CURRENCY.EUR,
  fromAmount: 0
};

interface IUserAction extends Action {
  user: IUser;
}

export default (state = initialState, action: Action | IWalletAction) => {
  switch (action.type) {
    case EXHANGE_ACTIONS.TOGGLE_EXCHANGE: {
      return {
        ...state,
        isOpen: !state.isOpen
      };
    }
    default:
      return state;
  }
};

export const toggleExchangeSlideover: ActionCreator<
  ThunkAction<void, IUser, void, Action>
> = () => {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      type: EXHANGE_ACTIONS.TOGGLE_EXCHANGE
    });
  };
};
