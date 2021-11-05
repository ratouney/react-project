import { Dispatch } from 'redux';
import { User } from '../types';

export enum SessionActionTypes {
  SET_CURRENT_USER = 'SESSION/SET_CURRENT_USER',
  CLEAR_CURRENT_USER = 'SESSION/CLEAR_CURRENT_USER',
  GET_RANDOM_USER = 'SESSION/GET_RANDOM_USER',
  SET_USER_NAME = 'SESSION/SET_USER_NAME',
}

export type SetCurrentUserAction = {
  type: string,
  userData: User,
};

export type ClearCurrentUserAction = {
  type: string,
};

export type GetRandomUserAction = {
  type: string,
  userData: any,
};

export type SetUserNameAction = {
  type: string,
  name: string,
};

export type SessionAction =
  SetCurrentUserAction
  | ClearCurrentUserAction
  | GetRandomUserAction
  | SetUserNameAction;

export const setCurrentUser = (userData: User): SetCurrentUserAction => ({
  type: SessionActionTypes.SET_CURRENT_USER,
  userData,
});

export const clearCurrentUser = (): ClearCurrentUserAction => ({
  type: SessionActionTypes.CLEAR_CURRENT_USER,
});

export const setUserName = (name: string): SetUserNameAction => ({
  type: SessionActionTypes.SET_USER_NAME,
  name,
});

export function getRandomUser() {
  return async (dispatch: Dispatch) => {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const ud: User = {
      name: `${data.results[0].name.first} ${data.results[0].name.last}`,
      email: data.results[0].email,
      profileIcon: data.results[0].picture.large,
    };
    dispatch({
      type: SessionActionTypes.SET_CURRENT_USER,
      userData: ud,
    });
  };
}
