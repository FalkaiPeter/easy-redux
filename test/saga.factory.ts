import { takeLatest } from "redux-saga/effects";

export function sagaFactory<Payload>(type: string, saga: Saga<Payload>) {
  return function* () {
    yield takeLatest(type, ({ payload }: ActionWithPayload<Payload>) => saga(payload));
  };
}
