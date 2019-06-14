import _ from 'lodash';
import {
    CONTRACTS,
    CONTRACT,
    CREATE_CONTRACT,
    DELETE_CONTRACT,
    EDIT_CONTRACT,
} from '../actions/types';



export default(state={}, action) => {
    switch(action.type) {
        case CONTRACTS:
            return {...state, ..._.mapKeys(action.payload, '_id')};
        case CREATE_CONTRACT:
            return {...state, [action.payload._id]: action.payload};
        case DELETE_CONTRACT:
            return _.omit(state, action.payload);
        case CONTRACT:
            return {...state, [action.payload._id]: action.payload};
        case EDIT_CONTRACT:
            return {...state, [action.payload._id]: action.payload};
        default:
            return state;
    }
};