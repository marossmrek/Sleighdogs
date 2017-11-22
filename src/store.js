import {createStore, combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";

import loaderReducer from "./reducers/loaderReducer"
import snackReducer from "./reducers/snackReducer";
import videoReducer from "./reducers/videoReducer";
import userReducer from "./reducers/userReducer";


const store = createStore(
    combineReducers({user:userReducer, video: videoReducer, snack: snackReducer, loader: loaderReducer, form: formReducer})
);

export default store;

