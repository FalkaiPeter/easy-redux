# **Easy-TS-Redux**

### Write Redux in TS with minimum or zero boilerplate

- [Redux Ducks](https://github.com/erikras/ducks-modular-redux) compliant
- [Immer ](https://immerjs.github.io/immer/) - built in support
- [Redux Saga](https://redux-saga.js.org/) - scalable async handling with generators

# Installation

```console
npm i easy-ts-redux
```

or

```console
yarn add easy-ts-redux
```

# Usage

## **Two major part: `easyStore()` and `easyReducer()`**

&nbsp;

## **Create Slices with `easyReducer()`**

#### **Parameters:**

- `initialState`(required) - must be some kind of object
- `prefix`(required) - its for avoiding action name collision (came from ReduxDucks)

```typescript
import { easyReducer } from "easy-ts-redux";

const { reducer, action, actionWithPayload, wartchers } = easyReducer(
  { foo: "bar", isEasy: true },
  "easy"
);
export default reducer;
```

### It's genetic so you can restrict the state type

```typescript
import { easyReducer } from "easy-ts-redux";

interface State {
  foo: string;
  isEasy: boolean;
}

const { reducer, action, actionWithPayload, wartchers } = easyReducer<State>(
  { foo: "bar", isEasy: true },
  "easy"
);

export default reducer;
```

- `reducer` is the Slice itself (it should be the default export)
- `action()` and `actionWithPayload()` for create your actions
- `watchers()` return all saga watcher function (parameter of `easyStore()`)

&nbsp;

## **Create actions with `action()` and `actionWithPayload()`**

### Both function has the same parameters, except `actionWithPayload` exept the type of the **payload**

- `type`(required) - **unique** identifier for the action
- `saga`(optional) - generator function for async data or dispatching other actions. (if provided this function get payload from action call)
- `reducerFn`(optional) - actual reducer function what modify the state

## **Important**

- ### Either `saga` or `reducerFn` must provided (or both), otherwide the action throw an error
- ### `saga` always has one arg whitch is the type prop
- ### `reducerFn` use [immer ](https://immerjs.github.io/immer/) internally, this means you can freely mutate the state.

```typescript
import {easyReducer} from 'easy-ts-redux';
import {put} from 'redux-saga/effects'

const {reducer, action, actionWithPayload, wartchers} = easyReducer({foo: 'bar'}, 'easy');

export const toggleEasy = action({
  type: 'TOGGLE_EASY',
  reducerFn: (state) => {
    state.isEasy = !state.isEasy;
  }
})

export const srtFoo = actionWithPayload<string>({
  type: 'SET_FOO',
  saga: function*(__reducerFnType, payload) { // __reducerFnType always provided, payload from action call
    //yield some async call
    const newPayload = payload + 'easy'
    yield put({type: __reducerFnType, payload: newPayload}) //call the reducerFn
  }
  reducerFn: (state, payload) => {
    state.foo = payload;
  }
})

const fooWatchers = watchers; // Unfortunatly you can'r export watchers out of the box
export fooWatchers;
export default reducer;
```

## **Drawback!** The `reducerFn`'s **payload** always be `any` inside `actionWithPayload()`

---

&nbsp;

## **Create store with `easyStore()`**

**Parameters:**

- `reducer`(required) - object of Slices
- `watchers`(optional) - Array of generated `watchers`
- `middlewares`(optional) - Array of middlewares

```typescript
import {easyStore} from 'easy-ts-redux';
import foo. {fooWatchers} from "./foo"; // Since you export the reducer as default, you can use any name

//optionally create Store type
export type Store = {
  foo: ReturnType<typeof foo>
}

const store = easyStore({foo}, [fooWatchers])
```

### This method do the followings:

- generate and run `sagaMiddleware`
- parse all `watchers` and combine them into a single array, what is consumed by sagaMiddleware
- configure [@redux-devtools/extension](https://www.npmjs.com/package/@redux-devtools/extension) for development mode
- create actual store

# Useful docs

- ## [Immer ](https://immerjs.github.io/immer/)
- ## [Redux Saga](https://redux-saga.js.org/)
- ## [Redux Ducks pattern](https://github.com/erikras/ducks-modular-redux)
- ## [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
