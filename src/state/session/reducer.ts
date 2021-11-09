import { Session } from '../types';
import {
  SessionAction, SessionActionTypes, SetCurrentUserAction, SetUserNameAction,
} from './actions';

export const initialState: Session = {
  user: undefined,
  connectedAt: Date.now(),
  admin: false,
};

export const sessionReducer = (
  state: Session = initialState,
  action: SessionAction,
) => {
  switch (action.type) {
    case SessionActionTypes.SET_CURRENT_USER: {
      const { userData } = <SetCurrentUserAction>action;

      return { ...state, user: userData };
    }
    case SessionActionTypes.CLEAR_CURRENT_USER:
      return { ...state, user: undefined };
    case SessionActionTypes.SET_USER_NAME: {
      const { name } = <SetUserNameAction>action;
      const newUser = { ...state.user, name };
      return { ...state, user: newUser };
    }
    default:
      return state;
  }
};
