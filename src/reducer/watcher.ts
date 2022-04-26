import { takeLatest } from "redux-saga/effects";
import { Saga } from "../types";

export function* watcher(type: string, saga: Saga) {
  yield takeLatest(type, () => saga(type.replace("_SAGA", "")));
}
