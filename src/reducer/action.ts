import { watcher } from "./watcher";
import { ActionProps, Handlers, Watchers } from "../types";
import { actionErrors } from "./errors";

export const action =
  <State>(prefix: string, watchers: Watchers, handlers: Handlers<State>) =>
  ({ type, saga, reducerFn }: ActionProps<State>) => {
    try {
      actionErrors(type, !!saga, !!reducerFn, Object.keys(watchers), Object.keys(handlers));
      const pre = (isSaga: boolean) => `${prefix}/${type}${isSaga ? "_SAGA" : ""}`;
      if (saga) watchers[type] = watcher(pre(true), saga);
      if (reducerFn) handlers[pre(false)] = reducerFn;
      return () => ({ type: pre(!!saga) });
    } catch (e) {
      console.error(e);
      return () => ({ type: "" });
    }
  };
