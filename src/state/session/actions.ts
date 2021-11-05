import { Dispatch } from 'redux';
import { User } from '../types';

export enum SESSION_ACTION_TYPES {
    SET_CURRENT_USER = 'SESSION/SET_CURRENT_USER',
    CLEAR_CURRENT_USER = 'SESSION/CLEAR_CURRENT_USER',
    GET_RANDOM_USER = 'SESSION/GET_RANDOM_USER',
};

export type setCurrentUserAction = {
    type: string,
    userData: User,
}

export type clearCurrentUserAction = {
    type: string,
}

export type getRandomUserAction = {
    type: string,
    userData: any,
}

export type SessionAction = 
    setCurrentUserAction 
    | clearCurrentUserAction
    | getRandomUserAction;

export const setCurrentUser = (userData : User):setCurrentUserAction => ({
    type: SESSION_ACTION_TYPES.SET_CURRENT_USER,
    userData
})

export const clearCurrentUser = ():clearCurrentUserAction => ({
    type: SESSION_ACTION_TYPES.CLEAR_CURRENT_USER
})

export function getRandomUser() {
    return async (dispatch : Dispatch) => {
        try {
            const response = await fetch("https://randomuser.me/api");
            const data = await response.json();
            console.log("Data : ", data.results[0])
            const ud : User = {
                name: data.results[0].name.first + " " + data.results[0].name.last,
                email: data.results[0].email,
                profileIcon: data.results[0].picture.thumbnail
            }
            dispatch({
                type: SESSION_ACTION_TYPES.SET_CURRENT_USER,
                userData: ud,
            })
        } catch (e) {
            console.error("GETRANDOMUSER : ", e)
        }
    };
}