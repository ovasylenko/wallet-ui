import { USER_ACTIONS } from "@data/actions/user";
import { IUser, IWallet } from "interfaces/user";
import { Dispatch } from "react";
import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { CURRENCY } from "@I/currency";
import { IWalletAction } from "./user";

const initialState = {
  currency: CURRENCY.EUR
};

interface IUserAction extends Action {
  user: IUser;
}

export default (state = initialState, action: Action | IWalletAction) => {
  switch (action.type) {
    case USER_ACTIONS.UPDATE_CURRENT_CURRENCY:{
      return {
        ...state,
        currency: (action as IWalletAction).currency
      }
    }
    default:
      return state;
  }
};

export const changeDefaultCurrency: ActionCreator<
  ThunkAction<Promise<void>, IUser, CURRENCY, IWalletAction>
> = (currency: CURRENCY) => {
  return async (dispatch: Dispatch<IWalletAction>): Promise<void> => {
    const { data: wallet }: { data: IWallet } = await axios(
      `/api/v1/wallet/${currency}`
    );
    dispatch({
      type: USER_ACTIONS.UPDATE_CURRENT_CURRENCY,
      wallet,
      currency,
    });
  };
};
