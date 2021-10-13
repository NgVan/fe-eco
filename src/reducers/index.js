import {combineReducers} from 'redux'
// import {reducer as formReducer} from 'redux-form'

import authReducer from './auth'
import { categoryReducer } from './categoryReducer';
import dashboarReducer from './dashboard'
import { productReducer } from './productReducer';

const reducers =  combineReducers({
    //form: formReducer,
    auth: authReducer,
    dash: dashboarReducer,
    product: productReducer,
    category: categoryReducer
});

//module.export = reducers;
export default reducers;