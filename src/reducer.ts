import produce, { Draft } from 'immer';
import { takeLatest } from 'redux-saga/effects';

type anyFn = (...args: any[]) => any;
type Action<Payload = any> = { type: string; payload: Payload };
type ReducerFn<State, Payload = any> = (state: Draft<State>, action: Action<Payload>) => void;

interface ActionOptions<State, T extends anyFn> {
  type: string;
  transformer: T;
  reducerFn?: ReducerFn<State, ReturnType<T>>;
  saga?: (action: Action<ReturnType<T>>) => Generator;
}

export function createReducer<State extends {}>(initialState: State, prefix: string) {
  const prefixer = (type: string, isSaga: boolean) => `${prefix}/${type}${isSaga ? '_SAGA' : ''}`;
  const handlers: Record<string, ReducerFn<State>> = {};
  const watchers: Generator[] = [];

  const createAction = <T extends anyFn>({
    type,
    reducerFn,
    transformer,
    saga,
  }: ActionOptions<State, T>) => {
    if (reducerFn) handlers[prefixer(type, false)] = reducerFn;
    if (saga) {
      const watcher = function* () {
        yield takeLatest(prefixer(type, true), saga);
      };
      watchers.push(watcher());
    }

    return (...args: Parameters<T>) => ({
      type: prefixer(type, !!saga),
      payload: transformer(...args) as ReturnType<T>,
    });
  };

  const reducer = (state: State = initialState, { type, payload }: Action) => {
    return type in handlers
      ? produce(state, (draft) => handlers[type](draft, { type, payload }))
      : state;
  };

  return { createAction, reducer, watchers, prefixer };
}
