import { Action } from "@ngrx/store";
import { User } from "../../../users/user.interface";

export enum AuthActionName {
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout',
  SET_USER = '[Auth] Set User',
};

export class Login implements Action {
  readonly type = AuthActionName.LOGIN;

  constructor(public token: string, public user: User) { }
};

export class Logout implements Action {
  readonly type = AuthActionName.LOGOUT;
};

export class SetUser implements Action {
  readonly type = AuthActionName.SET_USER;

  constructor(public user: User) { }
}

export type AuthAction = Login | Logout | SetUser;
