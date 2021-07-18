import { CURRENCY } from "@I/currency";

export interface IUser {
  name: string;
  email: string;
  userpic: string;
  wallet: {
    [key in CURRENCY]?: number;
  };
}