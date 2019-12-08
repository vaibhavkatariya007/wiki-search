import {lazy} from 'react';

const Articles = lazy(() => import('./Articles'));
const Detail = lazy(() => import('./Detail'));

export {Articles, Detail};
