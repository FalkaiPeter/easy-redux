import { takeLatest } from "redux-saga/effects";
import { SagaWithPayload } from "../types";

export function* watcherWithPayload(type: string, saga: SagaWithPayload<any>) {
  yield takeLatest(type, ({ payload }: any) => saga(type.replace("_SAGA", ""), payload));
}
