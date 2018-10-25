import { Action } from "@ngrx/store";
import { User } from "../../../users/user.interface";

export enum AuthActionName {
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout',
};

export class Login implements Action {
  readonly type = AuthActionName.LOGIN;

  constructor(public token: string, public user: User) { }
};

export class Logout implements Action {
  readonly type = AuthActionName.LOGOUT;
};

export type AuthAction = Login | Logout;
