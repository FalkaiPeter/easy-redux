import produce from "immer";
import { action } from "./action";
import { actionWithPayload } from "./actionWithPayload";
import { Handlers, Watchers } from "../types";

export default function <State extends {}>(initialState: State, prefix: string) {
  const __watchers: Watchers = {};
  const __handlers: Handlers<State> = {};

  const reducer = (state = initialState, { type, payload }: any) => {
    if (type in __handlers) return produce(state, (draft) => __handlers[type](draft, payload));
    return state;
  };

  return {
    reducer,
    watchers: () => Object.values(__watchers),
    action: action<State>(prefix, __watchers, __handlers),
    actionWithPayload: actionWithPayload<State>(prefix, __watchers, __handlers),
  };
}
