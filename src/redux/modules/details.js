import * as TYPES from './constants';
import {API} from '../../config';
import {requestDetails, receiveDetails, handleDetailsError} from './actions';

const initialState = {
  error: null,
  request: null,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.REQUEST_DETAILS:
      return {
        ...state,
        request: true,
      };
    case TYPES.RECEIVE_DETAILS:
      return {
        ...state,
        data: action.payload,
        request: false,
      };
    case TYPES.REQUEST_DETAILS_ERROR:
      return {
        ...state,
        error: true,
        request: false,
      };
    default:
      return state;
  }
};

export const fetchDetails = query => (dispatch, getState) => {
  let url = API.BASE_URL;

  let params = {
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exintro: '',
    explaintext: '',
    titles: query,
  };

  url = url + '?origin=*';
  Object.keys(params).forEach(key => {
    url += '&' + key + '=' + params[key];
  });

  dispatch(requestDetails());
  try {
    return fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response && response.query) {
          dispatch(receiveDetails(response.query.pages));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(handleDetailsError(error));
      });
  } catch (error) {
    console.log(error);
    dispatch(handleDetailsError(error));
  }
};
