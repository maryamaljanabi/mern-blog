import { userAuth } from "./index";

export const userAuthActions = {
  login: (payload) => ({
    type: userAuth.LOGIN,
    payload: payload,
  }),
  loginSuccess: (payload) => ({
    type: userAuth.LOGIN_SUCCESS,
    payload: payload,
  }),
  loginFailed: (err) => ({
    type: userAuth.LOGIN_FAILED,
    payload: err,
  }),
  logout: () => ({
    type: userAuth.LOGOUT,
  }),
};
