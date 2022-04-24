import { sagaFactory } from "./saga.factory";

export function actionFactory({ prefixer, _watchers }: EasyActionFactoryProps) {
  return function <TInputFn extends AnyFn>({ type, inputFn, saga }: EasyActionProps<TInputFn>) {
    if (saga) _watchers[`${type}_SAGA`] = sagaFactory(prefixer(type, true), saga)();
    return { type: prefixer(type, !!saga), payload: inputFn() };
  };
}
