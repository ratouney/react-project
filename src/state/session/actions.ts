import { User } from '../types';

export enum SESSION_ACTION_TYPES {
    SET_CURRENT_USER = 'SESSION/SET_CURRENT_USER',
    CLEAR_CURRENT_USER = 'SESSION/CLEAR_CURRENT_USER'
};

export type setCurrentUserAction = {
    type: string,
    userData: User,
}

export type clearCurrentUserAction = {
    type: string,
}

export type SessionAction = setCurrentUserAction | clearCurrentUserAction;

export const setCurrentUser = (userData : User):setCurrentUserAction => ({
    type: SESSION_ACTION_TYPES.SET_CURRENT_USER,
    userData
})

export const clearCurrentUser = ():clearCurrentUserAction => ({
    type: SESSION_ACTION_TYPES.CLEAR_CURRENT_USER
})