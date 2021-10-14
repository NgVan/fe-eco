import { applyMiddleware, createStore } from "redux";
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from "./reducers";

const jwtToken = localStorage.getItem("JWT_TOKEN")

const INITIAL_STATE = {
    auth : {
        token : "",
        isAuthenticated : jwtToken ? true: false,
        isAdmin: false,
        errorMessage: "",
        successMessage: ""
    }
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
  }

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
    persistedReducer,
    INITIAL_STATE,
    composeWithDevTools(
        applyMiddleware(reduxThunk)
        // other store enhancers if any
      ))

export const persistor = persistStore(store)

export default store;