import { applyMiddleware, createStore, compose } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import allReducer from './index';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(
  promise,
  thunk,
  // logger,
);

const store = createStore(
  allReducer,
  composeEnhancers(middleware),
);

// const store;
export default store;
