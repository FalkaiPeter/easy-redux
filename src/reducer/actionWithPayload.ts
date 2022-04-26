import { watcherWithPayload } from "./watcherWithPayload";
import { ActionWithPayloadProps, Handlers, Watchers } from "../types";
import { actionErrors } from "./errors";

export const actionWithPayload =
  <State>(prefix: string, watchers: Watchers, handlers: Handlers<State>) =>
  <Payload>({ type, saga, reducerFn }: ActionWithPayloadProps<State, Payload>) => {
    try {
      actionErrors(type, !!saga, !!reducerFn, Object.keys(watchers), Object.keys(handlers));
      const pre = (isSaga: boolean) => `${prefix}/${type}${isSaga ? "_SAGA" : ""}`;
      if (saga) watchers[type] = watcherWithPayload(pre(true), saga);
      if (reducerFn) handlers[type] = reducerFn;
      return (payload: Payload) => ({ type: pre(!!saga), payload });
    } catch (e) {
      console.error(e);
      return (payload: Payload) => ({ type: "", payload });
    }
  };
