/**
 * @Author: root
 * @Date:   2021-12-07T13:19:06+01:00
 * @Last modified by:   root
 * @Last modified time: 2021-12-07T15:02:32+01:00
 */



import { Dispatch } from 'redux';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile,
} from 'firebase/auth';
import { User } from '../types';

export enum SessionActionTypes {
  SET_CURRENT_USER = 'SESSION/SET_CURRENT_USER',
  CLEAR_CURRENT_USER = 'SESSION/CLEAR_CURRENT_USER',
  GET_RANDOM_USER = 'SESSION/GET_RANDOM_USER',
  SET_USER_NAME = 'SESSION/SET_USER_NAME',
  SET_PICTURE = 'SESSION/SET_PICTURE',
}

export type setPictureAction = {
    type: string,
    userPicture: string,
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
  | SetUserNameAction
  | setPictureAction;

export const setPicture = (userPicture: string):setPictureAction => ({
    type: SessionActionTypes.SET_PICTURE,
    userPicture
})

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

export function SignUp(email: string, password: string, name: string) {
  return async (dispatch: Dispatch) => {
    console.log("email: |", email, "| pass: ", password, " name: ", name)
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name,
    });
    return dispatch({
      type: SessionActionTypes.SET_CURRENT_USER,
      userData: {
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        profileIcon: userCredential.user.photoURL,
      },
    });
  };
}

export function SingIn(email: string, password: string) {
  return async (dispatch: Dispatch) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch({
      type: SessionActionTypes.SET_CURRENT_USER,
      userData: {
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        profileIcon: userCredential.user.photoURL,
      },
    });
  };
}

export async function DbTest() {
  console.log("hello oskour")
  console.log('pls HELP')
  console.log('pls HELP2')
}

export function SignOut() {
  return async (dispatch: Dispatch) => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(clearCurrentUser());
  };
}
