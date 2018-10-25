import { User } from "../../../users/user.interface";
import { AuthAction, AuthActionName } from "./auth.actions";

export interface AuthState {
  token: string,
  user: User,
  isLoggedIn: boolean,
};

const initialState: AuthState = {
  token: null,
  user: null,
  isLoggedIn: false,
};

export const authReducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionName.LOGIN:
      return {
        token: action.token,
        user: action.user,
        isLoggedIn: true,
      };
    case AuthActionName.LOGOUT:
      return {
        token: null,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
