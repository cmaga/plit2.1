import {SIGN_IN, SIGN_OUT, AUTH, FETCH_USER} from "./types";
import plitApi from '../api/plitApi';

//just need to call auth to change state
export const trySignOut = () => {
    return {
        type: 'SIGN_OUT'
    };
};

//needs to call api to get log in info and if there is a match you sign in
//then call auth to change state
export const fetchUser = (userName, password) => async dispatch => {
    const response = await plitApi.get(`/api/user/username/${userName}/password/${password}`);

    dispatch ({
        type: FETCH_USER,
        payload: response.data
    });
};

export const trySignIn = (userName, password) => async dispatch => {
    await dispatch(fetchUser());
    //const userId = response._id;

    dispatch({
        type: SIGN_IN,
        payload: response.data._id
    });
};

/*
export const changeAuth = () => {
    return {
        type: 'AUTH'
    };
};
*/