import { USER_ACTIONS } from "@data/actions/user";
import { IUser } from "interfaces/user";
import { Dispatch } from "react";
import axios from 'axios';
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

const initialState: IUser = {
  name: "",
  email: "",
  userpic:"",
  wallet: {}
};

interface IUserAction extends Action {
  user: IUser
}

export default (state = initialState, action: Action | IUserAction) => {
  switch (action.type) {
    case USER_ACTIONS.GET_USER: {
      return { ...(action as IUserAction).user };
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