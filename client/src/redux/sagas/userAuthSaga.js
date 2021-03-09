import { put, takeEvery } from "redux-saga/effects";
import { userAuth as actions } from "../actions";
import { userAuthActions } from "./../actions/actionCreator";
import { authAPI } from "./../../api/api";
import { saveState } from "./../store/sessionStorage";

function* createLogin(action) {
  try {
    const response = yield authAPI.login(action.payload);
    if (response.data.token) {
      const token = response.data.token;
      saveState({
        isLoggedIn: true,
        error: "",
        token: token,
      });
      yield put(
        userAuthActions.loginSuccess({
          token,
        })
      );
    }
  } catch (err) {
    yield put(userAuthActions.loginFailed("Login data is incorrect"));
  }
}

export function* createLoginStart() {
  yield takeEvery(actions.LOGIN, createLogin);
}
