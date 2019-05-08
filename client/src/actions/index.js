import plitApi from '../api/plitApi';
import {SIGN_IN,
    SIGN_OUT,
    TAB,
    BIDS,
    BID,
    CREATE_BID,
    DELETE_BID,
    EDIT_BID,
    SEARCH_NAME
} from "./types";


//just need to call auth to change state
export const trySignOut = () => async dispatch => {
//singing out is handled on the server side but whether or not the user is signed in is also stored in Redux
    const response = await plitApi.post('/api/logout');

    dispatch ({
        type: SIGN_OUT
    });
};

//needs to call api to get log in info and if there is a match you sign in
//then call auth to change state
export const trySignIn = (credentials) => async dispatch => {

    const response = await plitApi.post('/api/login', credentials);

    dispatch ({
        type: SIGN_IN,
        payload: response.data
    });
};

//response from server will be either the user if they are signed in or a '0'.
export const checkLoginStatus = () => async dispatch => {
    const response = await plitApi.get("/api/checkLoggedIn");

    dispatch ({
        type: SIGN_IN,
        payload: response.data
    });
};

export const tab = (tabName) => {
  return (
      {
          type: TAB,
          payload: tabName
      }
  )
};

export const bidList = () => async dispatch => {
    const response = await plitApi.get("/api/bids");

    dispatch ({
       type: BIDS,
       payload: response.data
    });
};

export const bid = (bidId) => async dispatch => {
    const response = await plitApi.get(`/api/bid/${bidId}`);

    dispatch ({
        type: BID,
        payload: response.data
    });
};

export const bidCreate = (formValues) => async dispatch => {
  const response = await plitApi.post("/api/add-bid", formValues);

    dispatch ({
        type: CREATE_BID,
        payload: response.data
    });
};

export const bidDelete = (bidId) => async dispatch => {
    const response = await plitApi.delete(`/api/remove-bid/${bidId}`);

    dispatch ({
        type: DELETE_BID,
        payload: bidId
    });
};

export const editBid = (formValues, bidId) => async dispatch => {
  const response = await plitApi.put(`api/update-bid/${bidId}`, formValues);

    dispatch({
        type: EDIT_BID,
        payload: response.data
    });
};

export const searchBids = (searchInput) => {
  return {
      type: SEARCH_NAME,
      payload: searchInput
  }
};

