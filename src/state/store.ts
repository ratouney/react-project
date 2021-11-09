import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { sessionReducer } from './session/reducer';
import { AppState } from './types';

export default createStore(
  combineReducers<AppState>({ session: sessionReducer }),
  applyMiddleware(thunk, logger),
);
