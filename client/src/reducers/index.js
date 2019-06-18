import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';

import authReducer from './authReducer';
import tabReducer from './tabReducer';
import bidReducer from './bidReducer';
import searchReducer from './searchReducer';
import contractReducer from './contractReducer';


export default combineReducers({
    auth: authReducer,
    tab: tabReducer,
    bids: bidReducer,
    form: formReducer,
    search: searchReducer,
    contracts: contractReducer
});