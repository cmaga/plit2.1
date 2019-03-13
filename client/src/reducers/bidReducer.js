import {BIDS} from '../actions/types';

const INITIAL_STATE = {
    bids: null
};

export default(state=INITIAL_STATE, action) => {
    switch(action.type) {
        case BIDS:
            return {...state, bids: action.payload};
        default:
            return state;
    }
};