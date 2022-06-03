import {FilterActionTypes} from './filter.types';

INITIAL_STATE = {
  filterPreserve: {},
};

export const filterPreserveReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FilterActionTypes.PRESERVE_FILTER:
      return {
        ...state,
        filterPreserve: action.payload,
      };

    default:
      return state;
  }
};
