import { combineReducers, createStore } from "redux";
import { sessionReducer } from "./session/reducer";
import { AppState } from "./types";

export default createStore(
    combineReducers<AppState>({session: sessionReducer})
)