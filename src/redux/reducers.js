import {combineReducers} from 'redux';

import articlesReducer from './modules/article';
import detailsReducer from './modules/details';

const appReducer = combineReducers({
  articles: articlesReducer,
  details: detailsReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
