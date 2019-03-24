import _ from 'lodash';
import {
    BIDS,
    BID,
    CREATE_BID,
    DELETE_BID,
    EDIT_BID,
} from '../actions/types';



export default(state={}, action) => {
    switch(action.type) {
        case BIDS:
            return {...state, ..._.mapKeys(action.payload, '_id')};
        case CREATE_BID:
            return {...state, [action.payload._id]: action.payload};
        case DELETE_BID:
            return _.omit(state, action.payload);
        case BID:
            return {...state, [action.payload._id]: action.payload};
        case EDIT_BID:
            return {...state, [action.payload._id]: action.payload};
        default:
            return state;
    }
};