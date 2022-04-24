type AnyFn = (...args: any[]) => undefined;

type Action = { type: string };
type ActionWithPayload<Payload = undefined> = { type: string; payload: Payload };
type EasyAction<Payload = undefined> = Action | ActionWithPayload<Payload>;

type Saga<Args> = (args: Args) => Generator;
type EasyWatchersObj = Record<string, Generator>;

type GeneratorReturnType<T extends Generator> = T extends Generator<any, infer R, any> ? R : never;

type EasyPrefixer = (type: string, isSaga: boolean) => string;

interface EasyReducerProps<State> {
  initialState: State;
  prefix: string;
}

interface EasyActionFactoryProps {
  prefixer: EasyPrefixer;
  _watchers: EasyWatchersObj;
}

interface EasyActionProps<TInputFn extends AnyFn> {
  type: string;
  inputFn?: TInputFn;
  saga?: Saga<ReturnType<TInputFn>>;
}
