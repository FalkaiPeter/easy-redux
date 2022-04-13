import { createStore as createReduxStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

interface Props {
  reducers?: Record<string, any>;
  watchers?: Generator[];
}

export function createStore({ reducers = {}, watchers = [] }: Props) {
  const rootReducer = combineReducers(reducers);
  const sagaMiddleware = createSagaMiddleware();

  function* rootSaga() {
    yield all(watchers);
  }

  const store = createReduxStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);
  return store;
}
