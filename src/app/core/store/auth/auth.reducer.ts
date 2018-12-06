import { User } from "../../../users/user.interface";
import { AuthAction, AuthActionName } from "./auth.actions";

export const JWT_KEY = 'blogging-app-jwt';
export const USER_KEY = 'blogging-app-user';

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
    case AuthActionName.SET_USER: {
      localStorage.setItem(USER_KEY, JSON.stringify(action.user));

      return { ...state, user: action.user };
    }
    case AuthActionName.SET_TOKEN: {
      localStorage.setItem(JWT_KEY, action.token);

      return { ...state, token: action.token };
    }
    default:
      return state;
  }
};
