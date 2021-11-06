import { combineReducers } from "redux";
import { addressReduser } from "./addressReduser";
import { residentsReduser } from "./residentsReduser";


export const rootReduser = combineReducers({
    address: addressReduser,
    residents: residentsReduser
})
