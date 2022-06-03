import { combineReducers } from 'redux';

import { homeReducer } from './home-item/home-item.reducer';
import { filterPreserveReducer } from './filter/filter.reducer'

export default combineReducers({
    homeContent: homeReducer,
    filter: filterPreserveReducer
})