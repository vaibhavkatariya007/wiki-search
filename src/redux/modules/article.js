import * as TYPES from './constants';
import {API} from '../../config';
import {
  requestSearchArticles,
  receiveSearchArticles,
  handleSearchArticlesError,
} from './actions';

const initialState = {
  error: null,
  request: false,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.REQUEST_SEARCH_ARTICLES:
      return {
        ...state,
        request: true,
      };
    case TYPES.RECEIVE_SEARCH_ARTICLES:
      return {
        ...state,
        data: action.payload,
        request: false,
      };
    case TYPES.REQUEST_SEARCH_ARTICLES_ERROR:
      return {
        ...state,
        error: true,
        request: false,
      };
    default:
      return state;
  }
};

export const searchArticles = query => (dispatch, getState) => {
  let url = API.BASE_URL;
  let params = {
    action: 'query',
    list: 'search',
    srsearch: query,
    format: 'json',
  };

  url = url + '?origin=*';
  Object.keys(params).forEach(key => {
    url += '&' + key + '=' + params[key];
  });

  dispatch(requestSearchArticles());
  try {
    return fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response && response.query) {
          dispatch(receiveSearchArticles(response.query.search));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(handleSearchArticlesError(error));
      });
  } catch (error) {
    console.log(error);
    dispatch(handleSearchArticlesError(error));
  }
};
