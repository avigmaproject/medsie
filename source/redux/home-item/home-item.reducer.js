import {HomeItemActionTypes} from './home-item.type';
import { searchFilter } from './home-item.utils';


const INITIAL_STATE = {
  content: [],
  filterData: [],
  search: '',
};

export const homeReducer = (state = INITIAL_STATE, action) => {
  console.log('Data: ', state);
  switch (action.type) {
    case HomeItemActionTypes.HOME_ITEM:
      return {
        ...state,
        content: action.payload,
        filterData: action.payload,
      };
    case HomeItemActionTypes.SEARCH:
      return {
        ...state,
        content: searchFilter(state, action),
        search: action.search,
      };
    default:
      return state;
  }
};

