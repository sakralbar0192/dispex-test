import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReduser } from "./redusers";

export const store = createStore(rootReduser, applyMiddleware(thunk)) 