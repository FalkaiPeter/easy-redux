import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

export default function <R extends {}, M extends []>(reducer: R, watchers?: (() => Generator[])[], middlewares?: M) {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({ reducer, middleware: [sagaMiddleware, ...(middlewares || [])] });

  sagaMiddleware.run(function* () {
    yield all(watchers?.flatMap((w) => w()) || []);
  });

  return store;
}
