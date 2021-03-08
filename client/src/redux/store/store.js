import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers/rootReducer";
import rootSaga from "../sagas/rootSaga";

// const persistedState = loadState();

const onSagaUncaughtErrors = (err, errInfo) => {
  console.log({ onSagaError: "saga error", err, errInfo });
};

const sagaMiddleware = createSagaMiddleware({ onError: onSagaUncaughtErrors });
const loggerMiddleware = createLogger();

const middleWares = [loggerMiddleware, sagaMiddleware];

let reduxStore;

const storeConfig = () => {
  const store = createStore(rootReducer, applyMiddleware(...middleWares));

  // start redux sagas
  sagaMiddleware.run(rootSaga);
  reduxStore = store;

  return store;
};

export { reduxStore };
export default storeConfig;
