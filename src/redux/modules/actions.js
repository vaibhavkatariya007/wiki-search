import * as TYPES from './constants';

export const requestSearchArticles = () => ({
  type: TYPES.REQUEST_SEARCH_ARTICLES,
});

export const handleSearchArticlesError = err => ({
  type: TYPES.REQUEST_SEARCH_ARTICLES_ERROR,
  err,
});

export const receiveSearchArticles = json => {
  const data =
    json &&
    json.map((item, idx) => {
      item.key = idx;
      return item;
    });
  return {
    type: TYPES.RECEIVE_SEARCH_ARTICLES,
    payload: data,
  };
};

export const requestDetails = () => ({
  type: TYPES.REQUEST_DETAILS,
});

export const handleDetailsError = err => ({
  type: TYPES.REQUEST_DETAILS_ERROR,
  err,
});

export const receiveDetails = json => ({
  type: TYPES.RECEIVE_DETAILS,
  payload: json,
});
