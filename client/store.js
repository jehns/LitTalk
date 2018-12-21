import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// initial state
const initialState = {}

// reducer
const reducer = (state = initialState, action) => {
  return state;
}

// create store
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))

export default store;
