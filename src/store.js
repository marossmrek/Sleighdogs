import {createStore, combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";

import loaderReducer from "./reducers/loaderReducer"
import snackReducer from "./reducers/snackReducer";
import videoReducer from "./reducers/videoReducer"

const store = createStore(
    combineReducers({video: videoReducer, snack: snackReducer, loader: loaderReducer, form: formReducer})
);

export default store;

