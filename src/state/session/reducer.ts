import { Session } from '../types';
import { SessionAction, SESSION_ACTION_TYPES, setCurrentUserAction } from './actions';

export const initialState:Session = {
  user: undefined,
  connectedAt: Date.now(),
  admin: false,
};

export const sessionReducer = (
  state:Session = initialState,
  action:SessionAction,
) => {
  switch (action.type) {
    case SESSION_ACTION_TYPES.SET_CURRENT_USER:
      const { userData } = <setCurrentUserAction>action;

      return { ...state, user: userData };
    case SESSION_ACTION_TYPES.CLEAR_CURRENT_USER:
      return { ...state, user: undefined };
    default:
      return state;
  }
};
