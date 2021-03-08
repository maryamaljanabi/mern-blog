import { all, call } from "redux-saga/effects";
import { createLoginStart } from "./userAuthSaga";

export default function* rootSaga() {
  yield all([call(createLoginStart)]);
}
