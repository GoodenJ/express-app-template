import { createStore, compose, applyMiddleware } from "redux";

import thunk from 'redux-thunk';
import combineReducers from "../reducers";

const store = createStore(
    combineReducers,
    {},
    compose(
        applyMiddleware(thunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;