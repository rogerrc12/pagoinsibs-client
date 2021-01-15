import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import createSaga from "redux-saga";
import rootSaga from "./sagas";

const initialState = {};
const sagaMiddleware = createSaga();
const middleware = [thunk, sagaMiddleware];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

export default store;
