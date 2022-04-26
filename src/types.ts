import { Draft } from "immer";

export type ReducerFn<State> = (state: Draft<State>, payload: any) => void;
export type Watchers = Record<string, Generator>;
export type Handlers<State> = Record<string, ReducerFn<State>>;

export type Action = { type: string };
export type Saga = (__reducerFnType: string) => Generator;
export interface ActionProps<State> {
  type: string;
  saga?: Saga;
  reducerFn?: ReducerFn<State>;
}

export type ActionWithPayload<Payload = any> = { type: string; payload: Payload };
export type SagaWithPayload<Payload> = (__reducerFnType: string, payload: Payload) => Generator;
export interface ActionWithPayloadProps<State, Payload = undefined> {
  type: string;
  saga?: SagaWithPayload<Payload>;
  reducerFn?: ReducerFn<State>;
}
