/**
 * @Author: root
 * @Date:   2021-12-07T13:06:10+01:00
 * @Last modified by:   root
 * @Last modified time: 2021-12-07T15:09:58+01:00
 */



import { Session } from '../types';
import {
  SessionAction, SessionActionTypes, SetCurrentUserAction, SetUserNameAction, setPictureAction
} from './actions';

export const initialState: Session = {
  user: undefined,
  connectedAt: Date.now(),
  admin: false,
  picture: "",
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
    case SessionActionTypes.SET_PICTURE: {
      const { userPicture } = <setPictureAction>action;
      console.log("log stp: ", userPicture)
      return { ...state, picture: userPicture}
    }
    default:
      return state;
  }
};
