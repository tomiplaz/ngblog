import { User } from "../../../users/user.interface";
import { AuthAction, AuthActionName } from "./auth.actions";

export const JWT_KEY = 'bloggging-jwt';
export const USER_KEY = 'bloggging-user';

export interface AuthState {
  token: string,
  user: User,
  isLoggedIn: boolean,
};

const initialState: AuthState = {
  token: localStorage.getItem(JWT_KEY),
  user: JSON.parse(localStorage.getItem(USER_KEY)),
  isLoggedIn: Boolean(localStorage.getItem(JWT_KEY)),
};

export const authReducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionName.LOGIN: {
      localStorage.setItem(JWT_KEY, action.token);
      localStorage.setItem(USER_KEY, JSON.stringify(action.user));

      return {
        token: action.token,
        user: action.user,
        isLoggedIn: true,
      };
    }
    case AuthActionName.LOGOUT: {
      localStorage.removeItem(JWT_KEY);
      localStorage.removeItem(USER_KEY);

      return {
        token: null,
        user: null,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};
