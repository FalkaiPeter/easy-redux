import { Draft } from "immer";
import { actionFactory } from "./action.factory";
import { prefixerFactory } from "./prefixer.factory";

const createEasyReducer = <State>({ initialState, prefix }: EasyReducerProps<State>) => {
  const prefixer = prefixerFactory(prefix);
  const _watchers: EasyWatchersObj = {};

  const createAction = actionFactory({ prefixer, _watchers });
};
