import { USER_ACTIONS } from "@data/actions/user";
import { IUser, IWallet } from "interfaces/user";
import { Dispatch } from "react";
import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { CURRENCY } from "@I/currency";

const initialState: IUser = {
  name: "",
  email: "",
  userpic: "",
  wallet: {} as IWallet,
  currentCurrency: {} as IWallet,
};

interface IUserAction extends Action {
  user: IUser;
}

export interface IWalletAction extends Action {
  wallet: IWallet;
  currency?: CURRENCY;
}

export default (
  state = initialState,
  action: Action | IUserAction | IWalletAction
) => {
  switch (action.type) {
    case USER_ACTIONS.GET_USER: {
      return { ...(action as IUserAction).user };
    }
    case USER_ACTIONS.REFRESH_WALLET: {
      return {
        ...state,
        wallet: { ...(action as IWalletAction).wallet },
      };
    }
    case USER_ACTIONS.UPDATE_CURRENT_CURRENCY: {
      return {
        ...state,
        currentCurrency: { ...(action as IWalletAction).wallet },
      };
    }
    default:
      return state;
  }
};

export const getUser: ActionCreator<
  ThunkAction<Promise<void>, IUser, null, IUserAction>
> = () => {
  return async (dispatch: Dispatch<IUserAction>): Promise<void> => {
    const { data: user }: { data: IUser } = await axios("/api/v1/auth");
    return dispatch({
      type: USER_ACTIONS.GET_USER,
      user,
    });
  };
};
