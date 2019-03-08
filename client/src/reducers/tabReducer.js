import {TAB} from "../actions/types";

const INITIAL_STATE = {
  tab: 'tools'
};

export default(state=INITIAL_STATE, action) => {
    switch(action.type) {
        case TAB:
            return {...state, tab: action.payload};
        default:
            return state;
    }
}