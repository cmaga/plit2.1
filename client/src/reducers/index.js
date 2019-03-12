import { combineReducers } from 'redux';

import authReducer from './authReducer';
import tabReducer from './tabReducer';
import bidReducer from './bidReducer';


export default combineReducers({
    auth: authReducer,
    tab: tabReducer,
    bids: bidReducer
});