import { Action } from "@ngrx/store";
import { User } from "../../../users/user.interface";

export enum AuthActionName {
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout',
  SET_USER = '[Auth] Set User',
  SET_TOKEN = '[Auth] Set Token',
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

export class SetToken implements Action {
  readonly type = AuthActionName.SET_TOKEN;

  constructor(public token: string) { }
}

export type AuthAction = Login | Logout | SetUser | SetToken;
