import { combineReducers } from 'redux';

import authReducer from './authReducer';
import tabReducer from './tabReducer';


export default combineReducers({
    auth: authReducer,
    tab: tabReducer
});